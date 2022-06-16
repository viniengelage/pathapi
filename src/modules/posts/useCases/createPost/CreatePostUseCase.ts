import { inject, injectable } from "tsyringe";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}
  async execute({
    title,
    description,
    content,
    see_more_url,
    user_id,
    thumbnail,
  }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.create({
      title,
      description,
      content,
      see_more_url,
      user_id,
      thumbnail,
    });

    return post;
  }
}

export { CreatePostUseCase };
