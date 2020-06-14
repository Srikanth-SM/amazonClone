import {MigrationInterface, QueryRunner} from "typeorm";

export class base1592143682362 implements MigrationInterface {
    name = 'base1592143682362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `sessionToken` `sessionToken` varchar(255) NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `sessionToken` `sessionToken` varchar(255) NULL");
    }

}
