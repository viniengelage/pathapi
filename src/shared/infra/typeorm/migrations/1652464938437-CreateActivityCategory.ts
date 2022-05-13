import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivityCategory1652464938437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activities_categories",
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
          { name: "icon", type: "varchar" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activities_categories");
  }
}
