/*
  Warnings:

  - You are about to alter the column `title` on the `hackathons` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(120)`.

*/
-- DropIndex
DROP INDEX `hackathons_title_description_slug_type_price_status_idx` ON `hackathons`;

-- DropIndex
DROP INDEX `projects_title_description_slug_idx` ON `projects`;

-- AlterTable
ALTER TABLE `hackathons` MODIFY `title` VARCHAR(120) NOT NULL,
    MODIFY `subtitle` VARCHAR(255) NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `projects` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- CreateIndex
CREATE INDEX `hackathons_title_slug_type_price_status_idx` ON `hackathons`(`title`, `slug`, `type`, `price`, `status`);

-- CreateIndex
CREATE INDEX `projects_title_slug_idx` ON `projects`(`title`, `slug`);
