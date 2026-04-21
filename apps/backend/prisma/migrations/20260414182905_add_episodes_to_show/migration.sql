/*
  Warnings:

  - A unique constraint covering the columns `[userId,showId]` on the table `UserShow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodes` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserShow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserShow_showId_key";

-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "episodes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserShow" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserShow_userId_showId_key" ON "UserShow"("userId", "showId");

-- AddForeignKey
ALTER TABLE "UserShow" ADD CONSTRAINT "UserShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
