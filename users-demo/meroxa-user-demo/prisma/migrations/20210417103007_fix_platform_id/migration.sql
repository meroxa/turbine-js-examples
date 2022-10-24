/*
  Warnings:

  - You are about to drop the column `plaftormId` on the `Survey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "plaftormId",
ADD COLUMN     "platformId" TEXT;
