import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {

    // create an ticket instance

    const ticket = Ticket.build({
        title: 'concert',
        price: 2,
        userId: '123'
    })

    //save the ticket to database
    await ticket.save();

    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two separate changes to the ticket we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // save the first fetched ticket
    await firstInstance!.save();

    //save the 2nd fectehd ticket and expect the error

    try {
        await secondInstance!.save();
    }
    catch (err) {
        return; // makes the test positive
    }

    throw new Error('Should not reach this point');

});


it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 2,
        userId: '123'
    })

    //save the ticket to database
    await ticket.save();

    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
})