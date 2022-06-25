import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class GoogleMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    try {
      const mailOptions = Object.freeze({
        to,
        from: "PATH <noreply@path.com.br>",
        subject,
        html: templateHTML,
      });

      const message = await this.client.sendMail(mailOptions);
      console.log("Message sent: %s", message.messageId);
    } catch (error) {
      console.log("An error", error);
    }
  }
}

export { GoogleMailProvider };
