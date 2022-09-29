import { Subjects, TicketCreatedEvent, Publisher } from "@sktickets1/common";

export class TicketCreatedListener extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}