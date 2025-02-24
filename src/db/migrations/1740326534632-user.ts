import { MigrationInterface, QueryRunner } from "typeorm";

export class User1740326534632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
             CREATE TABLE "user" (
                id varchar(36) NOT NULL DEFAULT (LOWER(HEX(RANDOMBLOB(16)))),
                name varchar(100) NOT NULL,
                password_hash varchar(255) NOT NULL,
                username_github varchar(100) NOT NULL,
                email varchar(255) NOT NULL,
                CONSTRAINT user_pk_id PRIMARY KEY (id),
                CONSTRAINT user_un_email UNIQUE (email),
                CONSTRAINT user_un_username_github UNIQUE (username_github)  
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    }

}
