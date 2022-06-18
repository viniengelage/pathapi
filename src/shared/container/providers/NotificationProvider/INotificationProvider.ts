import { ISendNotificationDTO } from "./dtos/SendNotificationDTO";

interface INotificationProvider {
  send(data: ISendNotificationDTO): Promise<void>;
}

export { INotificationProvider };
