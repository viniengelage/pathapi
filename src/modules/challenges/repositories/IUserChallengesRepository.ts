import { ICreateUserChallengeDTO } from "../dtos/ICreateUserChallengeDTO";
import { UserChallenge } from "../infra/typeorm/entities/UserChallenge";

interface IUserChallengesRepository {
  create(data: ICreateUserChallengeDTO): Promise<UserChallenge>;
  update(data: ICreateUserChallengeDTO): Promise<UserChallenge>;
  delete(id: string): Promise<void>;
  findByUserAndChallengeId(
    user_id: string,
    challenge_id: string
  ): Promise<UserChallenge>;
  findIncompletedChallenge(user_id: string): Promise<UserChallenge>;
  listByUserId(user_id: string): Promise<UserChallenge[]>;
  findById(id: string): Promise<UserChallenge>;
}

export { IUserChallengesRepository };
