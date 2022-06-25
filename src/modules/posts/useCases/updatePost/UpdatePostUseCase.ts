import { v2 as cloudinary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({
    id,
    title,
    description,
    content,
    see_more_url,
    thumbnail,
    user_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    if (user_id !== post.user.id) {
      throw new AppError("Esse post não é seu!");
    }

    if (thumbnail && post.thumbnail) {
      await cloudinary.uploader.destroy(post.thumbnail);
    }

    post.title = title;
    post.description = description;
    post.content = content;
    post.see_more_url = see_more_url;
    post.thumbnail = thumbnail;

    const updatedPost = await this.postsRepository.update(post);

    return updatedPost;
  }
}

export { UpdatePostUseCase };
