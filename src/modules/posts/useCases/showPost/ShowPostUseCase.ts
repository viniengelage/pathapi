import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowPostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(id: string) {
    const post = this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    return post;
  }
}

export { ShowPostUseCase };
