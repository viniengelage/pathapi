import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Activity } from "@modules/activities/infra/typeorm/entities/Activity";
import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";

export enum UserGenre {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  PROFESSIONAL = "professional",
}

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

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

  @Column()
  avatar: string;

  @Column({
    type: "enum",
    enum: UserGenre,
    default: UserGenre.MALE,
  })
  genre: "male" | "female" | "other";

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: "customer" | "admin" | "professional";

  @Column()
  push_token: string;

  @ManyToMany(() => Activity)
  @JoinTable({
    name: "users_activities",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "activity_id" }],
  })
  activities: Activity[];

  @ManyToMany(() => Challenge)
  @JoinTable({
    name: "users_challenges",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "challenge_id" }],
  })
  challenges: Challenge[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };
