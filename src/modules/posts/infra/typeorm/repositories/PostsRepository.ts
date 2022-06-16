import { getRepository, Repository } from "typeorm";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
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
    thumbnail,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      title,
      description,
      content,
      user_id,
      see_more_url,
      thumbnail,
    });

    await this.repository.save(post);

    return post;
  }

  async update({
    id,
    title,
    description,
    content,
    user_id,
    see_more_url,
    thumbnail,
  }: ICreatePostDTO): Promise<Post> {
    await this.repository.save({
      id,
      title,
      description,
      content,
      user_id,
      see_more_url,
      thumbnail,
    });

    const updatedPost = await this.repository.findOne(id);

    return updatedPost;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.repository
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .select(["posts", "user.id", "user.name", "user.avatar"])
      .getMany();

    return posts;
  }

  async findAllByUserId(user_id: string): Promise<Post[]> {
    const posts = await this.repository
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .where("posts.user_id = :id", { id: user_id })
      .select(["posts", "user.id", "user.name"])
      .getMany();

    return posts;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.repository.findOne(id);

    // add relation of users

    return post;
  }
}

export { PostsRepository };
