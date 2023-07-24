/*
  Warnings:

  - The values [ONGOING,ENDED,UPCOMING] on the enum `hackathons_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropIndex
DROP INDEX `users_email_job_title_idx` ON `users`;

-- AlterTable
ALTER TABLE `hackathons` ADD COLUMN `sub_status` ENUM('ONGOING', 'ENDED', 'UPCOMING') NULL DEFAULT 'ONGOING',
    MODIFY `status` ENUM('PUBLISHED', 'DRAFT') NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE INDEX `users_email_job_title_name_idx` ON `users`(`email`, `job_title`, `name`);
