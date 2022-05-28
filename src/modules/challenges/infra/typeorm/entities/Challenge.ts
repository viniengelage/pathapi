import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("challenges")
class Challenge {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  is_completed: boolean;

  @Column()
  earned_points: boolean;

  @Column()
  icon: string;

  @Column()
  see_more_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Challenge };
