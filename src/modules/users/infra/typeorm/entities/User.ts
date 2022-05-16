import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  AfterLoad,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Activity } from "@modules/activities/infra/typeorm/entities/Activity";

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
  private avatar_url: string;

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

  @ManyToMany(() => Activity)
  @JoinTable({
    name: "users_activities",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "activity_id" }],
  })
  activities: Activity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  getIconUrl() {
    if (this.avatar) {
      this.avatar_url = `http://localhost:3333/users/me/avatar/${this.avatar}`;
    }
  }
}

export { User };
