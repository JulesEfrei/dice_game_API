-- DropForeignKey
ALTER TABLE `UserToBadge` DROP FOREIGN KEY `UserToBadge_badgeId_fkey`;

-- DropForeignKey
ALTER TABLE `UserToBadge` DROP FOREIGN KEY `UserToBadge_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserToBadge` ADD CONSTRAINT `UserToBadge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserToBadge` ADD CONSTRAINT `UserToBadge_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `Badge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
