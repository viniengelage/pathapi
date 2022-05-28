import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChallenges1653767426670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "challenges",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "icon",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_completed",
            type: "boolean",
            default: "false",
          },
          {
            name: "earned_points",
            type: "integer",
          },
          {
            name: "see_more_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("challenges");
  }
}
