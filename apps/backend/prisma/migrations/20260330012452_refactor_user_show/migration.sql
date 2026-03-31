/*
  Warnings:

  - You are about to drop the `MyShow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MyShow" DROP CONSTRAINT "MyShow_showId_fkey";

-- DropForeignKey
ALTER TABLE "WatchProgress" DROP CONSTRAINT "WatchProgress_showId_fkey";

-- DropTable
DROP TABLE "MyShow";

-- DropTable
DROP TABLE "WatchProgress";

-- CreateTable
CREATE TABLE "UserShow" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "isFavourite" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "review" TEXT,
    "currentEpisode" INTEGER NOT NULL DEFAULT 0,
    "totalEpisodes" INTEGER NOT NULL DEFAULT 0,
    "status" "WatchStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserShow_showId_key" ON "UserShow"("showId");

-- AddForeignKey
ALTER TABLE "UserShow" ADD CONSTRAINT "UserShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
