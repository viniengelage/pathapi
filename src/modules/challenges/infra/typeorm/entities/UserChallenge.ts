import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_challenges")
class UserChallenge {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  challenge_id: string;

  @Column({
    default: false,
  })
  is_completed: boolean;
}

export { UserChallenge };
