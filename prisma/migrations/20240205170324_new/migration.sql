/*
  Warnings:

  - You are about to drop the column `commentary` on the `producttoorder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producttoorder` DROP COLUMN `commentary`,
    ADD COLUMN `comment` VARCHAR(191) NULL;
