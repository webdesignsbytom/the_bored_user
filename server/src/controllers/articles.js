// Emitters
import { myEmitterErrors } from '../event/errorEvents.js';
import { myEmitterEvents } from '../event/eventsLog.js';
// Domain
import { findAllEvents } from '../domain/events.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { findAllArticles } from '../domain/articles.js';
// Image upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
import fs from 'fs';

export const getLatestArticles = async (req, res) => {
  console.log('getLatestArticles');

  try {
    const testFolder = './src/assets/images/memes/';
    const imageEndPoint = 'http://localhost:4000/src/assets/images/memes/';

    fs.readdir(testFolder, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
    
      files.forEach((file) => {
        console.log(file);
      });
    });

    const foundArticles = await findAllArticles();
    console.log('foundArticles', foundArticles);

    return sendDataResponse(res, 200, { articles: foundArticles, imageEndPoint: imageEndPoint });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all events`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// export const uploadImageToArticle = async (req, res) => {
//   console.log('uploadImageToArticle');

//   try {
//     // Access the uploaded image data from req.file.buffer
//     const imageBuffer = req.file.buffer;

//     // Insert the image data into the ArticleImage table using Prisma as a BLOB
//     const createdImage = await prisma.articleImage.create({
//       data: {
//         imageTitle: 'YourImageTitle', // Replace with actual image title
//         articleItemId: 'YourArticleItemId', // Replace with actual article item ID
//         data: imageBuffer, // Store the image data as a BLOB
//       },
//     });

//     res.status(200).json({
//       message: 'Image uploaded and saved as BLOB to the database',
//       image: createdImage,
//     });
//   } catch (error) {
//     console.error('Error uploading image to the database', error);
//     res.status(500).json({ error: 'Error uploading image' });
//   }
// };
