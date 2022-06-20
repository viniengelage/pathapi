import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNivelToChallenge1655666865183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "challenges",
      new TableColumn({
        name: "level",
        type: "integer",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("challenges", "level");
  }
}
