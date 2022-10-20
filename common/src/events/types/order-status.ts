export enum OrderStatus {

    // when order has been created but the ticket order is trying to reserve
    // to the order is not yet reserved
    Created = 'created',

    // the ticket the order is trying to reserve has already been reserved
    // or when the user has cancelled the order
    // or the order expires before payment
    Cancelled = 'cancelled',

    // The Order has successfully reserved the ticket
    AwaitingPayment = 'awaiting:payment',

    //The order has reserved  the ticket and the user has done payment successfully
    Complete = 'complete'

}