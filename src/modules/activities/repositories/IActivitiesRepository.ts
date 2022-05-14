import { ICreateActivityDTO } from "../dtos/ICreateActivityDTO";
import { IUpdateActivityDTO } from "../dtos/IUpdateActivityDTO";
import { Activity } from "../infra/typeorm/entities/Activity";

interface IActivitiesRepository {
  create(data: ICreateActivityDTO): Promise<Activity>;
  update(data: IUpdateActivityDTO): Promise<Activity>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Activity>;
  findAll(): Promise<Activity[]>;
  findByName(name: string): Promise<Activity>;
}

export { IActivitiesRepository };
