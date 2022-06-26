import { v2 as cloudinary } from "cloudinary";
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
  @JoinColumn({ name: "activity_category_id" })
  activity_category: ActivityCategory;

  @Column()
  activity_category_id: string;

  @AfterLoad()
  private getUrl() {
    this.icon_url = cloudinary.url(this.icon);
  }
}

export { Activity };
