import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class RelationNaversAndProjectsWithUsers1601149470065
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'navers',
      new TableForeignKey({
        name: 'NaversUsers',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
    await queryRunner.createForeignKey(
      'projects',
      new TableForeignKey({
        name: 'ProjectsUsers',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects', 'ProjectsUsers')
    await queryRunner.dropForeignKey('navers', 'NaversUsers')
  }
}
