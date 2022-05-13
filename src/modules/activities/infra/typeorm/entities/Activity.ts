import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ActivityCategory } from "./ActivityCategory";

@Entity("activities")
class Activity {
  private icon_url: string;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @ManyToOne(() => ActivityCategory)
  @JoinColumn({ name: "activitiy_category_id" })
  activitiy_category: ActivityCategory;

  @Column()
  activitiy_category_id: string;

  @AfterLoad()
  private getUrl() {
    this.icon_url = `http://localhost:3333/activities/icons/${this.icon}`;
  }
}

export { Activity };
