import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersActivities1652710978066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_activities",
        columns: [
          { name: "user_id", type: "uuid" },
          { name: "activity_id", type: "uuid" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserActivity",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKActivityUser",
            referencedTableName: "activities",
            referencedColumnNames: ["id"],
            columnNames: ["activity_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_activities");
  }
}
