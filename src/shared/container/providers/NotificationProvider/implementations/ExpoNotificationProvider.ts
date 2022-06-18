import { Expo } from "expo-server-sdk";

import { ISendNotificationDTO } from "../dtos/SendNotificationDTO";
import { INotificationProvider } from "../INotificationProvider";

class ExpoNotificationProvider implements INotificationProvider {
  private expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  async send({
    to,
    title,
    body,
    subtitle,
  }: ISendNotificationDTO): Promise<void> {
    await this.expo.sendPushNotificationsAsync([
      {
        to,
        title,
        body,
        subtitle,
      },
    ]);

    console.log("Foi");
  }
}

export { ExpoNotificationProvider };
