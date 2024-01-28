import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';

async function seed() {
  const password = await bcrypt.hash('123', 8);

  // Create users
  const user1 = await dbClient.user.create({
    data: {
      email: `user1@gmail.com`,
      password,
    },
  });

  const user2 = await dbClient.user.create({
    data: {
      email: 'user2@gmail.com',
      password,
      role: 'WRITER',
    },
  });

  const user3 = await dbClient.user.create({
    data: {
      email: 'user3@gmail.com',
      password,
      role: 'ADMIN',
    },
  });

  const testUser = await dbClient.user.create({
    data: {
      email: `xto@gmail.com`,
      password,
    },
  });

  const adminUser = await dbClient.user.create({
    data: {
      email: 'admin@admin.com',
      password,
      role: 'ADMIN',
    },
  });

  const devUser = await dbClient.user.create({
    data: {
      email: 'dev@dev.com',
      password,
      role: 'DEVELOPER',
    },
  });

  // Create some fake articles with different types
  const article1 = await dbClient.article.create({
    data: {
      articleItems: {
        create: [
          {
            articleTitle: 'News Article 1',
            articleContent: 'This is the content of news article 1',
            articleAuthor: 'John Doe',
            articleType: 'NEWS',
            articleTags: 'Fake, News',
            articleImages: {
              create: [
                {
                  imageUrl: 'image_url_1.jpg',
                  imageTitle: 'Image 1',
                },
              ],
            },
          },
        ],
      },
      userId: user1.id,
    },
  });

  const article2 = await dbClient.article.create({
    data: {
      articleItems: {
        create: [
          {
            articleTitle: 'Opinion Article 1',
            articleContent: 'This is the content of opinion article 1',
            articleAuthor: 'Jane Smith',
            articleType: 'OPINION',
            articleTags: 'Fake, Opinion',
            articleImages: {
              create: [
                {
                  imageUrl: 'image_url_2.jpg',
                  imageTitle: 'Image 2',
                },
              ],
            },
          },
        ],
      },
      userId: user2.id,
    },
  });

  const article3 = await dbClient.article.create({
    data: {
      articleItems: {
        create: [
          {
            articleTitle: 'Feature Article 1',
            articleContent: 'This is the content of feature article 1',
            articleAuthor: 'Bob Johnson',
            articleType: 'FEATURE',
            articleTags: 'Fake, Feature',
            articleImages: {
              create: [
                {
                  imageUrl: 'image_url_3.jpg',
                  imageTitle: 'Image 3',
                },
              ],
            },
          },
        ],
      },
      userId: user3.id,
    },
  });

  // Create a list of memes as article items
  const memes = await Promise.all([
    dbClient.articleItem.create({
      data: {
        articleTitle: 'Meme 1',
        articleContent: 'This is a funny meme!',
        articleAuthor: 'Meme Creator 1',
        articleType: 'MEME',
        articleTags: 'Meme',
        articleImages: {
          create: [
            {
              imageUrl: 'meme_image_1.jpg',
              imageTitle: 'Meme Image 1',
            },
          ],
        },
        articleId: article1.id,
      },
    }),
    dbClient.articleItem.create({
      data: {
        articleTitle: 'Meme 2',
        articleContent: 'Another hilarious meme!',
        articleAuthor: 'Meme Creator 2',
        articleType: 'MEME',
        articleTags: 'Meme',
        articleImages: {
          create: [
            {
              imageUrl: 'meme_image_2.jpg',
              imageTitle: 'Meme Image 2',
            },
          ],
        },
        articleId: article1.id,
      },
    }),
  ]);

  // Create comments for articles and article items
  const comment1 = await dbClient.articleComment.create({
    data: {
      content: 'This is a comment on news article 1.',
      userId: user1.id,
      articleId: article1.id,
    },
  });

  const comment2 = await dbClient.articleComment.create({
    data: {
      content: 'I enjoyed reading this news article!',
      userId: user2.id,
      articleId: article1.id,
    },
  });

  const comment3 = await dbClient.articleComment.create({
    data: {
      content: 'Nice opinion article!',
      userId: user3.id,
      articleId: article2.id,
    },
  });

  const comment4 = await dbClient.articleItemComment.create({
    data: {
      content: 'This is a comment on meme 1.',
      userId: user1.id,
      articleItemId: memes[0].id,
    },
  });

  const comment5 = await dbClient.articleItemComment.create({
    data: {
      content: 'Interesting meme!',
      userId: user2.id,
      articleItemId: memes[0].id,
    },
  });

  const comment6 = await dbClient.articleItemComment.create({
    data: {
      content: 'I love this meme!',
      userId: user3.id,
      articleItemId: memes[1].id,
    },
  });

  // Create likes for articles and article items
  const articleLike1 = await dbClient.articleLike.create({
    data: {
      userId: user1.id,
      articleId: article1.id,
    },
  });

  const articleLike2 = await dbClient.articleLike.create({
    data: {
      userId: user2.id,
      articleId: article1.id,
    },
  });

  const articleItemLike1 = await dbClient.articleItemLike.create({
    data: {
      userId: user1.id,
      articleItemId: memes[0].id,
    },
  });

  const articleItemLike2 = await dbClient.articleItemLike.create({
    data: {
      userId: user2.id,
      articleItemId: memes[0].id,
    },
  });

  const articleCommentLike1 = await dbClient.articleCommentLike.create({
    data: {
      userId: user1.id,
      articleCommentId: comment1.id,
    },
  });

  const articleCommentLike2 = await dbClient.articleCommentLike.create({
    data: {
      userId: user2.id,
      articleCommentId: comment1.id,
    },
  });

  const articleItemCommentLike1 = await dbClient.articleItemCommentLike.create({
    data: {
      userId: user1.id,
      articleItemCommentId: comment4.id,
    },
  });

  const articleItemCommentLike2 = await dbClient.articleItemCommentLike.create({
    data: {
      userId: user2.id,
      articleItemCommentId: comment4.id,
    },
  });

  // EVENTS
  const event1 = await dbClient.event.create({
    data: {
      type: 'ERROR',
      topic: 'Test event',
      code: 500,
      content: '500 test content',
      createdBy: {
        connect: { id: user1.id },
      },
      receivedBy: {
        connect: { id: user3.id },
      },
    },
  });

  const event2 = await dbClient.event.create({
    data: {
      type: 'USER',
      topic: 'Test event',
      code: 200,
      content: '200 test content',
      createdBy: {
        connect: { id: user3.id },
      },
      receivedBy: {
        connect: { id: user2.id },
      },
    },
  });

  const event3 = await dbClient.event.create({
    data: {
      type: 'ADMIN',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdBy: {
        connect: { id: user2.id },
      },
      receivedBy: {
        connect: { id: user1.id },
      },
    },
  });

  const event4 = await dbClient.event.create({
    data: {
      type: 'VISITOR',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdBy: {
        connect: { id: user1.id },
      },
      receivedBy: {
        connect: { id: user3.id },
      },
    },
  });

  const event5 = await dbClient.event.create({
    data: {
      type: 'DEVELOPER',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdBy: {
        connect: { id: user3.id },
      },
      receivedBy: {
        connect: { id: user2.id },
      },
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
