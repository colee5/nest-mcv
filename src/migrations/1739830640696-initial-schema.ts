import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1739830640696 implements MigrationInterface {
    name = 'InitialSchema1739830640696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "brand" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "ownerId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "brand" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "ownerId" integer, CONSTRAINT "FK_63ec95660163a6bf36b19f3471f" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "approved", "price", "brand", "model", "year", "lat", "lng", "mileage", "ownerId") SELECT "id", "approved", "price", "brand", "model", "year", "lat", "lng", "mileage", "ownerId" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "brand" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "mileage" integer NOT NULL, "ownerId" integer)`);
        await queryRunner.query(`INSERT INTO "report"("id", "approved", "price", "brand", "model", "year", "lat", "lng", "mileage", "ownerId") SELECT "id", "approved", "price", "brand", "model", "year", "lat", "lng", "mileage", "ownerId" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
