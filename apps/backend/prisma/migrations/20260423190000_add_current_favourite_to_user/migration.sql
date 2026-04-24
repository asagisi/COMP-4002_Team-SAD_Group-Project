ALTER TABLE "User"
ADD COLUMN "currentFavouriteId" INTEGER;

ALTER TABLE "User"
ADD CONSTRAINT "User_currentFavouriteId_fkey"
FOREIGN KEY ("currentFavouriteId") REFERENCES "Show"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

CREATE INDEX "User_currentFavouriteId_idx" ON "User"("currentFavouriteId");
