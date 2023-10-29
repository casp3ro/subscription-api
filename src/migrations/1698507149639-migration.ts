import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698507149639 implements MigrationInterface {
  name = "Migration1698507149639";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "subscriptionId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_status_enum" AS ENUM('active', 'inactive', 'canceled', 'pending')`
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f1d3ffb910b5c1a9052df7c1833" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_f1d3ffb910b5c1a9052df7c1833"`
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
