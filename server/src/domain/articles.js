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
        create: headerImages.map(image => ({
          url: image.url,
          title: image.title,
        })),
      },
      items: {
        create: [
          {
            content,
            images: { // Use 'images' instead of 'articleImages'
              create: articleImages ? articleImages.map(image => ({
                url: image.url,
                title: image.title,
              })) : [],
            },
          },
        ],
      },
      userId,
    },
  });
