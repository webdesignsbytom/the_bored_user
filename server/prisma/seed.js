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
      id: 'dev',
      email: 'dev@dev.com',
      password,
      role: 'DEVELOPER',
    },
  });

  // Create some fake articles with different types
  const article1 = await dbClient.article.create({
    data: {
      title: 'News Article 1',
      author: 'John Doe',
      type: { set: ['NEWS'] },
      tags: ['Fake', 'News'],
      headerImages: {
        create: [
          {
            url: 'meme3.jpeg',
            title: 'Image 1',
          },
        ],
      },
      items: {
        create: [
          {
            content: 'This is the content of news article 1',
            images: {
              create: [
                {
                  url: 'meme1.jpeg',
                  title: 'Image 1',
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
      title: 'Opinion Article 1',
      author: 'Jane Smith',
      type: { set: ['NEWS'] },
      tags: ['Fake', 'News'],
      headerImages: {
        create: [
          {
            url: 'meme2.jpeg',
            title: 'Image 1',
          },
        ],
      },
      items: {
        create: [
          {
            content: 'This is the content of opinion article 1',
            images: {
              create: [
                {
                  url: 'meme4.jpeg',
                  title: 'Image 2',
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
      title: 'Feature Article 1',
      author: 'Bob Johnson',
      type: { set: ['NEWS'] },
      tags: ['Fake', 'News'],
      headerImages: {
        create: [
          {
            url: 'meme6.jpeg',
            title: 'Image 1',
          },
        ],
      },
      items: {
        create: [
          {
            content: 'This is the content of feature article 1',
            images: {
              create: [
                {
                  url: 'meme7.jpeg',
                  title: 'Image 3',
                },
              ],
            },
          },
        ],
      },
      userId: user3.id,
    },
  });

  const article4 = await dbClient.article.create({
    data: {
      title: 'Tech Article 1',
      author: 'Alice White',
      type: { set: ['TECHNOLOGY'] },
      tags: ['Tech', 'Gadgets'],
      headerImages: {
        create: [
          {
            url: 'tech1.jpeg',
            title: 'Image 1',
          },
        ],
      },
      items: {
        create: [
          {
            content: 'This is the content of tech article 1',
            images: {
              create: [
                {
                  url: 'tech2.jpeg',
                  title: 'Image 2',
                },
              ],
            },
          },
        ],
      },
      userId: user1.id,
    },
  });

  const article5 = await dbClient.article.create({
    data: {
      title: 'Cooking Article 1',
      author: 'Charlie Brown',
      type: { set: ['COOKING'] },
      tags: ['Food', 'Recipes'],
      headerImages: {
        create: [
          {
            url: 'cooking1.jpeg',
            title: 'Image 1',
          },
        ],
      },
      items: {
        create: [
          {
            content: 'This is the content of cooking article 1',
            images: {
              create: [
                {
                  url: 'cooking2.jpeg',
                  title: 'Image 2',
                },
              ],
            },
          },
        ],
      },
      userId: user2.id,
    },
  });

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

  // Now, create likes for articles and article items
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

  const articleLike3 = await dbClient.articleLike.create({
    data: {
      userId: user3.id,
      articleId: article2.id,
    },
  });

  // Create comments and likes for article items
  const itemComment1 = await dbClient.articleItemComment.create({
    data: {
      content: 'This is a comment on an article item.',
      userId: user1.id,
      articleItemId: (await dbClient.articleItem.findFirst({
        where: { articleId: article1.id }
      })).id,
    },
  });

  const itemLike1 = await dbClient.articleItemLike.create({
    data: {
      userId: user2.id,
      articleItemId: (await dbClient.articleItem.findFirst({
        where: { articleId: article1.id }
      })).id,
    },
  });

  // EVENTS
  const event1 = await dbClient.event.create({
    data: {
      type: 'ERROR',
      topic: 'Test event',
      code: 500,
      content: '500 test content',
      createdById: user1.id,
      receivedById: user3.id,
    },
  });

  const event2 = await dbClient.event.create({
    data: {
      type: 'USER',
      topic: 'Test event',
      code: 200,
      content: '200 test content',
      createdById: user3.id,
      receivedById: user2.id,
    },
  });

  const event3 = await dbClient.event.create({
    data: {
      type: 'ADMIN',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdById: user2.id,
      receivedById: user1.id,
    },
  });

  const event4 = await dbClient.event.create({
    data: {
      type: 'VISITOR',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdById: user1.id,
      receivedById: user3.id,
    },
  });

  const event5 = await dbClient.event.create({
    data: {
      type: 'DEVELOPER',
      topic: 'Test event',
      code: 201,
      content: '201 test content',
      createdById: user3.id,
      receivedById: user2.id,
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
