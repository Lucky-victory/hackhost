/*
  Warnings:

  - You are about to drop the column `project_id` on the `project_tools_used` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `hackathon_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `project_tools_used` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `project_tools_used` DROP FOREIGN KEY `project_tools_used_project_id_fkey`;

-- AlterTable
ALTER TABLE `project_tools_used` DROP COLUMN `project_id`;

-- CreateTable
CREATE TABLE `_ProjectToProjectToolsUsed` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToProjectToolsUsed_AB_unique`(`A`, `B`),
    INDEX `_ProjectToProjectToolsUsed_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `hackathon_categories_name_key` ON `hackathon_categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `project_tools_used_name_key` ON `project_tools_used`(`name`);

-- AddForeignKey
ALTER TABLE `_ProjectToProjectToolsUsed` ADD CONSTRAINT `_ProjectToProjectToolsUsed_A_fkey` FOREIGN KEY (`A`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToProjectToolsUsed` ADD CONSTRAINT `_ProjectToProjectToolsUsed_B_fkey` FOREIGN KEY (`B`) REFERENCES `project_tools_used`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
