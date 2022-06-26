import { v2 as cloudinary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowPostThumbnailUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(id: string): Promise<string> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    const thumbnail = cloudinary.url(post.thumbnail);

    return thumbnail;
  }
}

export { ShowPostThumbnailUseCase };
