/*
  Warnings:

  - You are about to drop the column `articleAuthor` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleTags` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleTitle` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleType` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `ArticleHeaderImage` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ArticleHeaderImage` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `ArticleImage` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ArticleImage` table. All the data in the column will be lost.
  - You are about to drop the column `articleContent` on the `ArticleItem` table. All the data in the column will be lost.
  - You are about to alter the column `topic` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `content` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ArticleHeaderImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ArticleHeaderImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ArticleImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ArticleImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `ArticleItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('RELATIONSHIPS', 'SCIENCE', 'HISTORY', 'MEMES', 'FUNNY', 'COOKING', 'TRAVEL', 'WAR', 'SPORTS', 'TECHNOLOGY', 'NEWS', 'OPINION');

-- CreateEnum
CREATE TYPE "ArticleRewardType" AS ENUM ('DISLIKED0', 'UNGRADED1', 'LIKED2', 'SUPERLIKED3', 'LOVED4', 'PERFECT5');

-- DropForeignKey
ALTER TABLE "ArticleComment" DROP CONSTRAINT "ArticleComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleItemComment" DROP CONSTRAINT "ArticleItemComment_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "articleAuthor",
DROP COLUMN "articleTags",
DROP COLUMN "articleTitle",
DROP COLUMN "articleType",
ADD COLUMN     "author" VARCHAR(255) NOT NULL,
ADD COLUMN     "tags" VARCHAR(255)[],
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" "ArticleType"[];

-- AlterTable
ALTER TABLE "ArticleHeaderImage" DROP COLUMN "imageTitle",
DROP COLUMN "imageUrl",
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "ArticleImage" DROP COLUMN "imageTitle",
DROP COLUMN "imageUrl",
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "ArticleItem" DROP COLUMN "articleContent",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "topic" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemComment" ADD CONSTRAINT "ArticleItemComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
