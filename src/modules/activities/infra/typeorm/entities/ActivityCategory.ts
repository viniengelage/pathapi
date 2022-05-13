import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activities_categories")
class ActivityCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  icon: string;
}

export { ActivityCategory };
