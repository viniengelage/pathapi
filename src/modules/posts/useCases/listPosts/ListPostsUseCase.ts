import { inject, injectable } from "tsyringe";

import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

@injectable()
class ListPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(user_id?: string): Promise<Post[]> {
    let posts: Post[];

    if (user_id) {
      posts = await this.postsRepository.findAllByUserId(user_id);
    } else {
      posts = await this.postsRepository.findAll();
    }

    return posts;
  }
}

export { ListPostsUseCase };
