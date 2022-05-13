import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivity1652477049777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activities",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar", isNullable: true },
          {
            name: "activitiy_category_id",
            type: "varchar",
            isNullable: true,
          },
          { name: "icon", type: "varchar" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKCategoryActivies",
            referencedTableName: "activities_categories",
            referencedColumnNames: ["id"],
            columnNames: ["activitiy_category_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activities");
  }
}
