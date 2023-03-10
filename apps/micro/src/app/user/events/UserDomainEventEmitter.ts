import {Injectable} from "@nestjs/common";
import {RMQService} from "nestjs-rmq";
import {UserEntity} from "../user.entity";

@Injectable()
export default class UserDomainEventEmitter {
  constructor(private rmqService: RMQService) {}

  public async emit(user: UserEntity): Promise<void>
  {
      for (const event of user.domainEvents) {
        await this.rmqService.notify(event.topic, event.data)
      }
  }
}
