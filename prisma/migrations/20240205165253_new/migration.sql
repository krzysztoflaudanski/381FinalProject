/*
  Warnings:

  - You are about to drop the column `comment` on the `producttoorder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producttoorder` DROP COLUMN `comment`,
    ADD COLUMN `commentary` VARCHAR(191) NULL;
