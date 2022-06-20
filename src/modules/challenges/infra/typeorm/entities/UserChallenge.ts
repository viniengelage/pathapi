import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "@modules/users/infra/typeorm/entities/User";

import { Challenge } from "./Challenge";

@Entity("users_challenges")
class UserChallenge {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  challenge_id: string;

  @ManyToOne(() => Challenge)
  @JoinColumn({ name: "challenge_id" })
  challenge: Challenge;

  @Column({
    default: false,
  })
  is_completed: boolean;
}

export { UserChallenge };
