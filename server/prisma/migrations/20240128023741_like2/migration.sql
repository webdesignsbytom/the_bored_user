-- CreateTable
CREATE TABLE "ArticleLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleItemLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleItemLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleItemCommentLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleItemCommentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleItemCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleLike_userId_articleId_key" ON "ArticleLike"("userId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleItemLike_userId_articleItemId_key" ON "ArticleItemLike"("userId", "articleItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleItemCommentLike_userId_articleItemCommentId_key" ON "ArticleItemCommentLike"("userId", "articleItemCommentId");

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemLike" ADD CONSTRAINT "ArticleItemLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemLike" ADD CONSTRAINT "ArticleItemLike_articleItemId_fkey" FOREIGN KEY ("articleItemId") REFERENCES "ArticleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemCommentLike" ADD CONSTRAINT "ArticleItemCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleItemCommentLike" ADD CONSTRAINT "ArticleItemCommentLike_articleItemCommentId_fkey" FOREIGN KEY ("articleItemCommentId") REFERENCES "ArticleItemComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
