import { MigrationInterface, QueryRunner } from 'typeorm'

export class RelationBetweenNaversAndProjects1601153859800
  implements MigrationInterface {
  name = 'RelationBetweenNaversAndProjects1601153859800'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "ProjectsUsers"`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers" DROP CONSTRAINT "NaversUsers"`,
    )
    await queryRunner.query(
      `CREATE TABLE "navers_projects_projects" ("naversId" uuid NOT NULL, "projectsId" uuid NOT NULL, CONSTRAINT "PK_507af73803cb57949a855340b7e" PRIMARY KEY ("naversId", "projectsId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_fa9f9cea0f092596642c9a1f14" ON "navers_projects_projects" ("naversId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_931aa5604f48968bb893c513e3" ON "navers_projects_projects" ("projectsId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers" ADD CONSTRAINT "FK_39b7d3bc33b1e1fb27649d91e37" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" ADD CONSTRAINT "FK_fa9f9cea0f092596642c9a1f149" FOREIGN KEY ("naversId") REFERENCES "navers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" ADD CONSTRAINT "FK_931aa5604f48968bb893c513e3e" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" DROP CONSTRAINT "FK_931aa5604f48968bb893c513e3e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" DROP CONSTRAINT "FK_fa9f9cea0f092596642c9a1f149"`,
    )
    await queryRunner.query(
      `ALTER TABLE "navers" DROP CONSTRAINT "FK_39b7d3bc33b1e1fb27649d91e37"`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010"`,
    )
    await queryRunner.query(`DROP INDEX "IDX_931aa5604f48968bb893c513e3"`)
    await queryRunner.query(`DROP INDEX "IDX_fa9f9cea0f092596642c9a1f14"`)
    await queryRunner.query(`DROP TABLE "navers_projects_projects"`)
    await queryRunner.query(
      `ALTER TABLE "navers" ADD CONSTRAINT "NaversUsers" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "ProjectsUsers" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }
}
