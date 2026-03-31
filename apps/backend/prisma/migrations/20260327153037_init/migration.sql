-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('NOT_STARTED', 'WATCHING', 'FINISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyShow" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "isFavourite" BOOLEAN NOT NULL DEFAULT false,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MyShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchProgress" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "currentEpisode" INTEGER NOT NULL,
    "totalEpisodes" INTEGER NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MyShow" ADD CONSTRAINT "MyShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchProgress" ADD CONSTRAINT "WatchProgress_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
