import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("challenges")
class Challenge {
  private icon_url: string;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  earned_points: number;

  @Column()
  icon: string;

  @Column()
  level: number;

  @Column()
  see_more_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  getUrl() {
    this.icon_url = `${process.env.APP_HOST}:${process.env.APP_PORT}/challenges/${this.id}/icon`;
  }
}

export { Challenge };
