import { Activity } from "@modules/activities/infra/typeorm/entities/Activity";

interface IUpdateUserDTO {
  id?: string;
  email?: string;
  password?: string;
  name: string;
  birthday?: Date;
  free_time: Date;
  cellphone: string;
  genre: "male" | "female" | "other";
  avatar?: string;
  activities?: Activity[];
  points?: number;
  push_token?: string;
}

export { IUpdateUserDTO };
