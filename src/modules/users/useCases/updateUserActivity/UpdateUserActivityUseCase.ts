import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  activities_id: string[];
}

@injectable()
class UpdateUserActivityUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ user_id, activities_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    const activities = await this.activitiesRepository.findByIds(activities_id);

    user.activities = activities;

    const updatedUser = await this.usersRepository.update(user);

    delete updatedUser.password;

    return updatedUser;
  }
}

export { UpdateUserActivityUseCase };
