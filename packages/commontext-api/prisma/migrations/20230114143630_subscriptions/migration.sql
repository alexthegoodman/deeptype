/*
  Warnings:

  - Added the required column `frequency` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "subscription" TEXT NOT NULL,
ADD COLUMN     "subscriptionToken" TEXT NOT NULL;
