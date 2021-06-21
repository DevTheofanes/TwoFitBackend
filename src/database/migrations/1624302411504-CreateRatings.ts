import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRatings1624302411504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'place_id',
            type: 'varchar',
          },
          {
            name: 'user_author',
            type: 'varchar',
          },
          {
            name: 'stars',
            type: 'varchar',
          },
          {
            name: 'comments',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'Date',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings');
  }
}
