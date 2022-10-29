import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';


it('fethces on order for a given orderid', async () => {
    // Create  a tickt

    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save();

    const user = global.signin();

    // Create an order with that Ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)

    // fetch the order created above

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});

it('gives 401 error is one user try to fetch the order of other user', async () => {
    // Create  a ticket

    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save();

    const user = global.signin();

    // Create an order with that Ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)

    // fetch the order created above

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
});
