-- CreateTable
CREATE TABLE "ArticleCommentLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleCommentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleCommentLike_userId_articleCommentId_key" ON "ArticleCommentLike"("userId", "articleCommentId");

-- AddForeignKey
ALTER TABLE "ArticleCommentLike" ADD CONSTRAINT "ArticleCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleCommentLike" ADD CONSTRAINT "ArticleCommentLike_articleCommentId_fkey" FOREIGN KEY ("articleCommentId") REFERENCES "ArticleComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
