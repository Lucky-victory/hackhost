/*
  Warnings:

  - You are about to drop the `_HackathonToHackathonTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToProjectToolsUsed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hackathon_id` to the `hackathon_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `project_tools_used` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `user_interest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `user_skills` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_HackathonToHackathonTags` DROP FOREIGN KEY `_HackathonToHackathonTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_HackathonToHackathonTags` DROP FOREIGN KEY `_HackathonToHackathonTags_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ProjectToProjectToolsUsed` DROP FOREIGN KEY `_ProjectToProjectToolsUsed_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProjectToProjectToolsUsed` DROP FOREIGN KEY `_ProjectToProjectToolsUsed_B_fkey`;

-- DropForeignKey
ALTER TABLE `user_interest` DROP FOREIGN KEY `user_interest_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_skills` DROP FOREIGN KEY `user_skills_user_id_fkey`;

-- AlterTable
ALTER TABLE `hackathon_categories` ADD COLUMN `hackathon_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project_tools_used` ADD COLUMN `project_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_interest` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_skills` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_HackathonToHackathonTags`;

-- DropTable
DROP TABLE `_ProjectToProjectToolsUsed`;

-- CreateTable
CREATE TABLE `Follower` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `followerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Following` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `followingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_interest` ADD CONSTRAINT `user_interest_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tools_used` ADD CONSTRAINT `project_tools_used_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathon_categories` ADD CONSTRAINT `hackathon_categories_hackathon_id_fkey` FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
