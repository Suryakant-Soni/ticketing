import { Subjects, OrderCancelledEvent, Publisher } from "@sktickets1/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}