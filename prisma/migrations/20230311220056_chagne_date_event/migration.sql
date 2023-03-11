/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `date`,
    ADD COLUMN `day` VARCHAR(191) NULL,
    ADD COLUMN `exactDate` DATETIME(3) NULL,
    ADD COLUMN `time` VARCHAR(191) NULL;
