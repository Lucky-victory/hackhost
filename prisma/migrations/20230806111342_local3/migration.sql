/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Following` table. All the data in the column will be lost.
  - Added the required column `follower_id` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Following` DROP FOREIGN KEY `Following_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `Following` DROP FOREIGN KEY `Following_userId_fkey`;

-- AlterTable
ALTER TABLE `Follower` DROP COLUMN `createdAt`,
    DROP COLUMN `followerId`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `follower_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Following` DROP COLUMN `createdAt`,
    DROP COLUMN `followingId`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `following_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
