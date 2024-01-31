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
