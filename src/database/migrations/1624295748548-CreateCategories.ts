import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1624295748548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'subcategory',
            type: 'varchar',
          },
          {
            name: 'background_url',
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
    await queryRunner.dropTable('categories');
  }
}
