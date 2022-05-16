import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("activities_categories")
class ActivityCategory {
  private icon_url: string;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  icon: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  getIconUrl() {
    this.icon_url = `${process.env.APP_HOST}:${process.env.APP_PORT}/activities/icons/${this.icon}`;
  }
}

export { ActivityCategory };
