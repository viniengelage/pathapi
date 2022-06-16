import { getRepository, Repository } from "typeorm";

import { CreatePostDTO } from "@modules/posts/dtos/CreatePostDTO";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

import { Post } from "../entities/Post";

class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({
    title,
    description,
    content,
    user_id,
    see_more_url,
  }: CreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      title,
      description,
      content,
      user_id,
      see_more_url,
    });

    await this.repository.save(post);

    return post;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.repository.findOne(id, { relations: ["user"] });

    delete post.user.password;

    return post;
  }
}

export { PostsRepository };
