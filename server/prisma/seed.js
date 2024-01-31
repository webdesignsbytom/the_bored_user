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
      articleTitle: 'News Article 1',
      articleAuthor: 'John Doe',
      articleType: 'NEWS',
      articleTags: 'Fake, News',
      articleHeaderImages: {
        create: [
          {
            imageUrl: 'meme3.jpeg',
            imageTitle: 'Image 1',
          },
        ],
      },
      articleItems: {
        create: [
          {
            articleContent: 'This is the content of news article 1',
            articleImages: {
              create: [
                {
                  imageUrl: 'meme1.jpeg',
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
      articleTitle: 'Opinion Article 1',
      articleAuthor: 'Jane Smith',
      articleType: 'OPINION',
      articleTags: 'Fake, Opinion',
      articleHeaderImages: {
        create: [
          {
            imageUrl: 'meme2.jpeg',
            imageTitle: 'Image 1',
          },
        ],
      },
      articleItems: {
        create: [
          {
            articleContent: 'This is the content of opinion article 1',
            articleImages: {
              create: [
                {
                  imageUrl: 'meme4.jpeg',
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
      articleTitle: 'Feature Article 1',
      articleAuthor: 'Bob Johnson',
      articleType: 'FEATURE',
      articleTags: 'Fake, Feature',
      articleHeaderImages: {
        create: [
          {
            imageUrl: 'meme6.jpeg',
            imageTitle: 'Image 1',
          },
        ],
      },
      articleItems: {
        create: [
          {
            articleContent: 'This is the content of feature article 1',
            articleImages: {
              create: [
                {
                  imageUrl: 'meme7.jpeg',
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

  // You've created comments and likes for articles, let's proceed to create article item comments and likes

  
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
