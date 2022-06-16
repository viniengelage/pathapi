import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { Post } from "../infra/typeorm/entities/Post";

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  update(data: ICreatePostDTO): Promise<Post>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Post[]>;
  findAllByUserId(user_id: string): Promise<Post[]>;
  findById(id: string): Promise<Post>;
}

export { IPostsRepository };
