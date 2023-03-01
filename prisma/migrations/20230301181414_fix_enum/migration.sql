/*
  Warnings:

  - The values [Femele] on the enum `User_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `gender` ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Male';
