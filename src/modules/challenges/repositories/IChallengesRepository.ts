import { ICreateChallengeDTO } from "../dtos/ICreateChallengeDTO";
import { Challenge } from "../infra/typeorm/entities/Challenge";

export interface IChallengesRepository {
  create(data: ICreateChallengeDTO): Promise<Challenge>;
  update(data: ICreateChallengeDTO): Promise<Challenge>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Challenge[]>;
  findById(id: string): Promise<Challenge>;
}
