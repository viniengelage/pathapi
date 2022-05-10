import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1652050924055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "username", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "password", type: "varchar" },
          { name: "name", type: "varchar" },
          { name: "birthday", type: "date", isNullable: true },
          { name: "cellphone", type: "varchar", isNullable: true },
          { name: "points", type: "numeric", isNullable: true, default: 0 },
          { name: "free_time", type: "time", isNullable: true },
          {
            name: "genre",
            type: "enum",
            enum: ["male", "female", "other"],
            enumName: "genreEnum",
            default: `'male'`,
          },
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}