import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecipients1595512539852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipients',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address_street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address_number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'address_complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_cep',
            type: 'varchar',
            length: '8',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'varchar',
            length: '2',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recipients');
  }
}
