import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // propertyName : is bound to A value from Subjects Enum, also subject variable is strongly types to Subject Enum type
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);
    msg.ack();
  }
}
