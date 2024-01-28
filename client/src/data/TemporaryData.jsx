// Images
import Meme1 from '../assets/images/memes/meme1.jpeg';
import Meme2 from '../assets/images/memes/meme2.jpeg';
import Meme3 from '../assets/images/memes/meme3.jpeg';
import Meme4 from '../assets/images/memes/meme4.jpeg';

export const tempMemeArticlesArray = [
  {
    id: 'article1',
    type: 'article',
    category: 'funny',
    articleItems: [
      {
        id: 'item1',
        articleTitle: 'The Evolution of Memes',
        articleContent: 'A deep dive into the history of memes...',
        articleAuthor: 'John Doe',
        articleType: 'History',
        articleTags: 'memes, internet, culture',
        articleImages: [
          {
            id: 'img1',
            imageUrl: Meme1,
            imageTitle: 'Early Internet Meme',
          },
        ],
        articleId: 'article1',
        comments: [
          {
            id: 'comment1',
            content: 'Really insightful article!',
            userId: 'user1',
          },
        ],
        likes: [
          {
            id: 'like1',
            userId: 'user2',
          },
        ],
      },
    ],
    comments: [
      {
        id: 'comment2',
        content: 'This article is hilarious!',
        userId: 'user3',
      },
    ],
    likes: [
      {
        id: 'like2',
        userId: 'user4',
      },
    ],
    userId: 'dev',
    author: 'Tom Brockington',
    createdAt: '',
  },

  // Article 2
  {
    id: 'article2',
    type: 'memes',
    category: 'funny',
    articleItems: [
      {
        id: 'item2',
        articleTitle: 'Meme Gallery: A Visual Journey',
        articleContent: 'Explore the world of memes through images.',
        articleAuthor: 'Jane Smith',
        articleType: 'Gallery',
        articleTags: 'memes, humor, gallery',
        articleImages: [
          {
            id: 'img2',
            imageUrl: Meme1, // Replace with actual URL
            imageTitle: 'Classic Meme 1',
          },
          {
            id: 'img3',
            imageUrl: Meme2, // Replace with actual URL
            imageTitle: 'Classic Meme 2',
          },
          {
            id: 'img3',
            imageUrl: Meme3, // Replace with actual URL
            imageTitle: 'Classic Meme 2',
          },
          {
            id: 'img3',
            imageUrl: Meme4, // Replace with actual URL
            imageTitle: 'Classic Meme 2',
          },
          // Add more images as needed
        ],
        articleId: 'article2',
        comments: [],
        likes: [],
      },
    ],
    comments: [],
    likes: [],
    userId: 'dev',
    author: 'Tom Brockington',
    createdAt: '',
  },
];
