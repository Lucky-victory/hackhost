/*
  Warnings:

  - You are about to drop the column `userId` on the `hackathon_categories` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `hackathon_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hackathon_categories` DROP FOREIGN KEY `hackathon_categories_userId_fkey`;

-- AlterTable
ALTER TABLE `hackathon_categories` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `hackathon_categories` ADD CONSTRAINT `hackathon_categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
