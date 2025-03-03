import { MigrationInterface, QueryRunner } from 'typeorm';

export class Task1740326559452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "task" (
        id varchar(150) NOT NULL DEFAULT (LOWER(HEX(RANDOMBLOB(16)))),
        title varchar(255) NOT NULL,
        description varchar(510) NULL,
        status varchar(50) NOT NULL DEFAULT 'PENDENTE',
        expiration_date datetime NOT NULL,
        user_id varchar(150) NOT NULL DEFAULT (LOWER(HEX(RANDOMBLOB(16)))),
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT task_pk_id PRIMARY KEY (id),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "task"`);
  }
}
