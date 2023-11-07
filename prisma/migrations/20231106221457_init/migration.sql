-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "jop" TEXT;
