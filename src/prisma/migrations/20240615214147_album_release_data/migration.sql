-- AlterTable
ALTER TABLE "Albums" ALTER COLUMN "releaseDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "releaseDate" SET DATA TYPE TIMESTAMP(3);