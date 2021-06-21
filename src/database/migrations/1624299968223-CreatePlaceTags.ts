import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlaceTags1624299968223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'placeTags',
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
            name: 'icon_url',
            type: 'varchar',
          },
          {
            name: 'place_id',
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
    await queryRunner.dropTable('placeTags');
  }
}
