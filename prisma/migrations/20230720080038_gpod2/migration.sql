/*
  Warnings:

  - You are about to drop the column `title` on the `hackathon_categories` table. All the data in the column will be lost.
  - You are about to drop the column `hackathon_category_id` on the `hackathons` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `submissions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `hackathon_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hackathon_categories` DROP FOREIGN KEY `hackathon_categories_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `hackathons` DROP FOREIGN KEY `hackathons_hackathon_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_hackathon_id_fkey`;

-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_user_id_fkey`;

-- DropIndex
DROP INDEX `hackathon_categories_title_idx` ON `hackathon_categories`;

-- DropIndex
DROP INDEX `hackathons_title_description_slug_idx` ON `hackathons`;

-- DropIndex
DROP INDEX `users_email_job_title_skills_idx` ON `users`;

-- AlterTable
ALTER TABLE `hackathon_categories` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `hackathons` DROP COLUMN `hackathon_category_id`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `interest`,
    DROP COLUMN `skills`;

-- DropTable
DROP TABLE `submissions`;

-- CreateTable
CREATE TABLE `user_interest` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,

    INDEX `user_interest_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_skills` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,

    INDEX `user_skills_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `screenshot_url` VARCHAR(191) NOT NULL,
    `repo_url` VARCHAR(191) NOT NULL,
    `demo_url` VARCHAR(191) NOT NULL,
    `file_url` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `hackathon_id` VARCHAR(191) NOT NULL,
    `is_winner` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_title_description_slug_idx`(`title`, `description`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_tools_used` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NULL,

    INDEX `project_tools_used_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HackathonToHackathonCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_HackathonToHackathonCategory_AB_unique`(`A`, `B`),
    INDEX `_HackathonToHackathonCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `hackathon_categories_name_idx` ON `hackathon_categories`(`name`);

-- CreateIndex
CREATE INDEX `hackathons_title_description_slug_type_price_status_idx` ON `hackathons`(`title`, `description`, `slug`, `type`, `price`, `status`);

-- CreateIndex
CREATE INDEX `users_email_job_title_idx` ON `users`(`email`, `job_title`);

-- AddForeignKey
ALTER TABLE `user_interest` ADD CONSTRAINT `user_interest_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_hackathon_id_fkey` FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tools_used` ADD CONSTRAINT `project_tools_used_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathon_categories` ADD CONSTRAINT `hackathon_categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HackathonToHackathonCategory` ADD CONSTRAINT `_HackathonToHackathonCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `hackathons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HackathonToHackathonCategory` ADD CONSTRAINT `_HackathonToHackathonCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `hackathon_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
