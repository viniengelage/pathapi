interface ISendNotificationDTO {
  to: string;
  title: string;
  subtitle?: string;
  body: string;
}

export { ISendNotificationDTO };
