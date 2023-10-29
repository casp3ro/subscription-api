import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698561689687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "subscription" ("status") VALUES ('pending')`
    );
    await queryRunner.query(
      `INSERT INTO "user" ("firstName", "lastName", "subscriptionId") VALUES ('John', 'Doe', (SELECT "id" FROM "subscription" WHERE "status" = 'pending'));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "firstName" = 'John' AND "lastName" = 'Doe'`
    );
    await queryRunner.query(
      `DELETE FROM "subscription" WHERE "status" = 'pending'`
    );
  }
}
