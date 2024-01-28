/*
  Warnings:

  - Added the required column `articleItemId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "articleItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleItemId_fkey" FOREIGN KEY ("articleItemId") REFERENCES "ArticleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
