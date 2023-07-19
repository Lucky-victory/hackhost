-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `job_title` VARCHAR(191) NULL,
    `interest` VARCHAR(191) NULL,
    `skills` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `role` ENUM('BASIC', 'ADMIN', 'MOD') NOT NULL DEFAULT 'BASIC',
    `username` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_job_title_skills_idx`(`email`, `job_title`, `skills`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `submissions` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `screenshot_url` VARCHAR(191) NOT NULL,
    `repo_url` VARCHAR(191) NOT NULL,
    `demo_url` VARCHAR(191) NOT NULL,
    `file_url` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `tools` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `hackathon_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `submissions_slug_key`(`slug`),
    INDEX `submissions_title_description_slug_idx`(`title`, `description`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hackathons` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `total_price` INTEGER NOT NULL,
    `hackathon_category_id` VARCHAR(191) NULL,

    UNIQUE INDEX `hackathons_slug_key`(`slug`),
    INDEX `hackathons_title_description_slug_idx`(`title`, `description`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hackathon_categories` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `hackathon_categories_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hackathon_participants` (
    `id` VARCHAR(191) NOT NULL,
    `hackathon_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_hackathon_id_fkey` FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathons` ADD CONSTRAINT `hackathons_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathons` ADD CONSTRAINT `hackathons_hackathon_category_id_fkey` FOREIGN KEY (`hackathon_category_id`) REFERENCES `hackathon_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathon_categories` ADD CONSTRAINT `hackathon_categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathon_participants` ADD CONSTRAINT `hackathon_participants_hackathon_id_fkey` FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hackathon_participants` ADD CONSTRAINT `hackathon_participants_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
