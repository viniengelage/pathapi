import { v2 as cloudinary } from "cloudinary";
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
    this.icon_url = cloudinary.url(this.icon);
  }
}

export { ActivityCategory };
