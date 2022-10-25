import request from "supertest";
import mongoose from 'mongoose';
import { app } from '../../app';
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";




request

it('return an error if the ticket doesnt exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId })
        .expect(404);
});

// to test this u need initial setup - an order and a ticket shud be created and both should be associated
it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        userId: 'assassshk',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket
    });
    await order.save();
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(201);
});


it.todo('emits and order created event');