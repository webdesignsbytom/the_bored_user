/*
  Warnings:

  - You are about to drop the column `articleAuthor` on the `ArticleItem` table. All the data in the column will be lost.
  - You are about to drop the column `articleTags` on the `ArticleItem` table. All the data in the column will be lost.
  - You are about to drop the column `articleTitle` on the `ArticleItem` table. All the data in the column will be lost.
  - You are about to drop the column `articleType` on the `ArticleItem` table. All the data in the column will be lost.
  - Added the required column `articleAuthor` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleTags` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleTitle` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleType` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "articleAuthor" TEXT NOT NULL,
ADD COLUMN     "articleTags" TEXT NOT NULL,
ADD COLUMN     "articleTitle" TEXT NOT NULL,
ADD COLUMN     "articleType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ArticleItem" DROP COLUMN "articleAuthor",
DROP COLUMN "articleTags",
DROP COLUMN "articleTitle",
DROP COLUMN "articleType";
