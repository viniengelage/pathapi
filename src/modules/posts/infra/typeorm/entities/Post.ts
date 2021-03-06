import { v2 as cloudinary } from "cloudinary";
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "@modules/users/infra/typeorm/entities/User";

@Entity("posts")
class Post {
  private thumbnail_url: string;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  see_more_url: string;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  private getUrl() {
    this.thumbnail_url = cloudinary.url(this.thumbnail);
  }
}

export { Post };
