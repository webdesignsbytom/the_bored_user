import dbClient from '../utils/dbClient.js';

export const findAllArticles = () =>
  dbClient.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      articleItems: true,
      articleHeaderImages: true,
      likes: true,
    },
    take: 10, // Limit the result to the latest 10 items
  });

export const findArticleById = (articleId) =>
  dbClient.article.findMany({
    where: {
      id: articleId,
    },
    include: {
      articleItems: true,
      articleHeaderImages: true,
      likes: true,
    },
  });

export const deleteArticleById = (articleId) =>
  dbClient.article.delete({
    where: {
      id: articleId,
    },
  });

export const createNewCommentForArticle = (articleId, userId, content) =>
  dbClient.articleComment.create({
    data: {
      content,
      user: {
        connect: { id: userId },
      },
      article: {
        connect: { id: articleId },
      },
    },
  });

export const createArticle = (
  title,
  content,
  author,
  type,
  tags,
  headerImages,
  articleImages,
  userId
) =>
  dbClient.article.create({
    data: {
      title,
      author,
      type: { set: type },
      tags: { set: tags },
      headerImages: {
        create: headerImages.map((image) => ({
          url: image.url,
          title: image.title,
        })),
      },
      items: {
        create: [
          {
            content,
            images: {
              // Use 'images' instead of 'articleImages'
              create: articleImages
                ? articleImages.map((image) => ({
                    url: image.url,
                    title: image.title,
                  }))
                : [],
            },
          },
        ],
      },
      userId,
    },
  });

export const likeArticle = (articleId, userId) =>
  dbClient.articleLike.create({
    data: {
      user: {
        connect: { id: userId },
      },
      article: {
        connect: { id: articleId },
      },
    },
  });

export const checkForLike = (articleId, userId) =>
  dbClient.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

export const removeLike = (articleId, userId) =>
  dbClient.articleLike.delete({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

export const checkForArticleCommentLike = (articleCommentId, userId) =>
  dbClient.articleCommentLike.findUnique({
    where: {
      userId_articleCommentId: {
        userId,
        articleCommentId,
      },
    },
  });

export const addArticleCommentLike = (articleCommentId, userId) =>
  dbClient.articleCommentLike.create({
    data: {
      userId,
      articleCommentId,
    },
  });

export const deleteArticleCommentLike = (articleCommentId, userId) =>
  dbClient.articleCommentLike.delete({
    where: {
      userId_articleCommentId: {
        userId,
        articleCommentId,
      },
    },
  });
