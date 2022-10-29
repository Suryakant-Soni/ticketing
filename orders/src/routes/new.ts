import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@sktickets1/common';
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'



const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    //find the ticket the user is trying to reserve in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }

    //make sure the ticket is not already reserved
    //run query to look at all orders
    // find the order with this ticket and order status is not cancelled
    // if we find an order that means the ticket is reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
        throw new BadRequestError('Ticket is already reserved');
    }

    //calculate the expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)


    // build the order and save it to database

    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    })

    await order.save();

    // publish the event of order created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        },
    });
    res.status(201).send(order);
});

export { router as newOrderRouter };