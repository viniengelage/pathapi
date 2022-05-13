import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activities_categories")
class ActivityCategory {
  private icon_url: string;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  icon: string;

  @AfterLoad()
  getIconUrl() {
    this.icon_url = `http://localhost:3333/activities/icons/${this.icon}`;
  }
}

export { ActivityCategory };
