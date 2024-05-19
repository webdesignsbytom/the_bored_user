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
  BadRequestEvent,
} from '../event/utils/errorUtils.js';
import { createArticle, findAllArticles } from '../domain/articles.js';
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

    return sendDataResponse(res, 200, {
      articles: foundArticles,
      imageEndPoint: imageEndPoint,
    });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all events`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllArticles = async (req, res) => {
  console.log('getAllArticles');

  try {
    const foundArticles = await findAllArticles(type);
    console.log('foundArticles', foundArticles);

    return sendDataResponse(res, 200, { articles: foundArticles });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Get all articles`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllArticlesByType = async (req, res) => {
  console.log('getAllArticlesByType');

  try {
    const { type } = req.query;
    const foundArticles = await findAllArticlesByType(type);
    console.log('foundArticles', foundArticles);

    return sendDataResponse(res, 200, { articles: foundArticles });
  } catch (err) {
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all articles by type`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewArticle = async (req, res) => {
  console.log('createNewArticle');
  const { userId } = req.params;
  console.log('userId', userId);
  const { title, content, author, type, tags, headerImages, articleImages } =
    req.body;

  try {
    console.log('11111111111111111');

    if (!userId || !title || !content || !author || !type) {
      const missingField = new MissingFieldEvent(
        null,
        'Article creation: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    console.log('2222222222222222222', title);
    // Create new article logic here
    const createdArticle = await createArticle(
      title,
      content,
      author,
      type,
      tags,
      headerImages,
      articleImages,
      userId
    );

    console.log('333333333333333333333');

    if (!createdArticle) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createArticleFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created article', createdArticle);

    return sendDataResponse(res, 200, {
      message: 'Article created successfully',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Create new article`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const editArticle = async (req, res) => {
  console.log('editArticle');

  try {
    const { articleId } = req.params;
    const { title, content } = req.body;

    // Edit article logic here

    return sendDataResponse(res, 200, {
      message: 'Article edited successfully',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Edit article`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const deleteArticle = async (req, res) => {
  console.log('deleteArticle');

  try {
    const { articleId } = req.params;

    // Delete article logic here

    return sendDataResponse(res, 200, {
      message: 'Article deleted successfully',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Delete article`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
