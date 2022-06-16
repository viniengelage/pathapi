import { CreatePostDTO } from "../dtos/CreatePostDTO";
import { Post } from "../infra/typeorm/entities/Post";

interface IPostsRepository {
  create(data: CreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post>;
}

export { IPostsRepository };
