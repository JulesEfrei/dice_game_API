-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_gameId_fkey`;

-- AlterTable
ALTER TABLE `Booking` MODIFY `gameId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
