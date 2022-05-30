import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersChallenges1653867130871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_challenges",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          { name: "user_id", type: "uuid" },
          { name: "challenge_id", type: "uuid" },
          {
            name: "is_completed",
            type: "boolean",
            default: "false",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserChallenge",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKChallengeUser",
            referencedTableName: "challenges",
            referencedColumnNames: ["id"],
            columnNames: ["challenge_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_challenges");
  }
}
