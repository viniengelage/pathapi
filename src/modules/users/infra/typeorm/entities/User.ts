import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

export enum UserGenre {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: "date",
  })
  birthday: Date;

  @Column({
    type: "time",
    nullable: true,
  })
  free_time: Date;

  @Column()
  cellphone: string;

  @Column()
  points?: number;

  @Column({
    type: "enum",
    enum: UserGenre,
    default: UserGenre.MALE,
  })
  genre: "male" | "female" | "other";

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuidV4();
  //     this.points = 0;
  //   }
  // }
}

export { User };
