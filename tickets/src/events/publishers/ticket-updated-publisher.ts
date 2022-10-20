import { Subjects, TicketUpdatedEvent, Publisher } from "@sktickets1/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}


