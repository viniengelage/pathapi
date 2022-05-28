import { ICreateChallengeDTO } from "../dtos/ICreateChallengeDTO";
import { Challenge } from "../infra/typeorm/entities/Challenge";

export interface IChallengesRepository {
  create(data: ICreateChallengeDTO): Promise<Challenge>;
}
