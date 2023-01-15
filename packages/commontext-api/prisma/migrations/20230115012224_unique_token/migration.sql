/*
  Warnings:

  - A unique constraint covering the columns `[subscriptionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_subscriptionToken_key" ON "User"("subscriptionToken");
