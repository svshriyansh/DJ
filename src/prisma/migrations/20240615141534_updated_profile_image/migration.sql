/*
  Warnings:

  - Made the column `profileImage` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "profileImage" SET NOT NULL,
ALTER COLUMN "profileImage" SET DEFAULT '';
