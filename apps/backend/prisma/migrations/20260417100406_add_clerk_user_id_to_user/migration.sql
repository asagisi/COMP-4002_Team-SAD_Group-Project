-- AlterTable: add clerkUserId with a temporary default for existing rows
ALTER TABLE "User" ADD COLUMN "clerkUserId" TEXT NOT NULL DEFAULT '';

-- Backfill existing rows with unique placeholder values
UPDATE "User" SET "clerkUserId" = 'legacy_user_' || "id" WHERE "clerkUserId" = '';

-- Remove the default so future inserts must provide a real Clerk ID
ALTER TABLE "User" ALTER COLUMN "clerkUserId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
