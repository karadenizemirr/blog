/*
  Warnings:

  - You are about to drop the column `postId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `View` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_postId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeId" TEXT,
ADD COLUMN     "viewId" TEXT;

-- AlterTable
ALTER TABLE "View" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "Like"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE SET NULL ON UPDATE CASCADE;
