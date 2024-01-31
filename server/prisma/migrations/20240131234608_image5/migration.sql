/*
  Warnings:

  - The `articleTags` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "articleTags",
ADD COLUMN     "articleTags" TEXT[];
