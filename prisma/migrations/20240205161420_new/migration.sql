/*
  Warnings:

  - Added the required column `quantity` to the `ProductToOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producttoorder` ADD COLUMN `quantity` INTEGER NOT NULL;
