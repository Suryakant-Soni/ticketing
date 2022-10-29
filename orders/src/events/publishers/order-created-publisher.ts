import { Publisher, OrderCreatedEvent, Subjects } from "@sktickets1/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}