-- Add per-user matchup visibility flag (default: private)
ALTER TABLE "users"
ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
