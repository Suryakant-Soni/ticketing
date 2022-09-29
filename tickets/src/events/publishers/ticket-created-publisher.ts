import { Subjects, TicketCreatedEvent, Publisher } from "@sktickets1/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}


