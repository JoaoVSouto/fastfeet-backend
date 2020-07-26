import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePackages1595776077634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'packages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'recipient_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'courier_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'signature_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'product',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'packages',
      new TableForeignKey({
        name: 'PackageRecipient',
        columnNames: ['recipient_id'],
        referencedTableName: 'recipients',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'packages',
      new TableForeignKey({
        name: 'PackageCourier',
        columnNames: ['courier_id'],
        referencedTableName: 'couriers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'packages',
      new TableForeignKey({
        name: 'PackageSignature',
        columnNames: ['signature_id'],
        referencedTableName: 'files',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('packages', 'PackageSignature');
    await queryRunner.dropForeignKey('packages', 'PackageCourier');
    await queryRunner.dropForeignKey('packages', 'PackageRecipient');

    await queryRunner.dropTable('packages');
  }
}
