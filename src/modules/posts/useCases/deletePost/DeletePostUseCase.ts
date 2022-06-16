import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    if (post.user_id !== user_id) {
      throw new AppError("Esse post não é seu!");
    }

    await this.postsRepository.delete(post.id);
  }
}
export { DeletePostUseCase };
