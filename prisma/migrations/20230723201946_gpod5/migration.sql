/*
  Warnings:

  - You are about to alter the column `type` on the `hackathons` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(3))`.
  - You are about to alter the column `status` on the `hackathons` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.
  - You are about to drop the `_HackathonToHackathonCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_HackathonToHackathonCategory` DROP FOREIGN KEY `_HackathonToHackathonCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_HackathonToHackathonCategory` DROP FOREIGN KEY `_HackathonToHackathonCategory_B_fkey`;

-- AlterTable
ALTER TABLE `hackathons` MODIFY `type` ENUM('PUBLIC', 'PRIVATE') NULL DEFAULT 'PUBLIC',
    MODIFY `status` ENUM('ONGOING', 'ENDED', 'UPCOMING', 'PUBLISHED', 'DRAFT') NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `status` ENUM('PUBLISHED', 'DRAFT') NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `authType` ENUM('CREDENTIALS', 'GITHUB', 'GOOGLE') NOT NULL DEFAULT 'CREDENTIALS';

-- DropTable
DROP TABLE `_HackathonToHackathonCategory`;

-- CreateTable
CREATE TABLE `_HackathonToHackathonTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_HackathonToHackathonTags_AB_unique`(`A`, `B`),
    INDEX `_HackathonToHackathonTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HackathonToHackathonTags` ADD CONSTRAINT `_HackathonToHackathonTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `hackathons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HackathonToHackathonTags` ADD CONSTRAINT `_HackathonToHackathonTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `hackathon_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
