-- CreateTable
CREATE TABLE "ArticleItemComment" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "userId" TEXT NOT NULL,
    "articleItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ArticleItemComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleItemComment" ADD CONSTRAINT "ArticleItemComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemComment" ADD CONSTRAINT "ArticleItemComment_articleItemId_fkey" FOREIGN KEY ("articleItemId") REFERENCES "ArticleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
