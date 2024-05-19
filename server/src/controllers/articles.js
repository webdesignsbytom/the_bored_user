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
    const serverError = new ServerErrorEvent(req.user, `Get all articles by type`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewArticle = async (req, res) => {
  console.log('createNewArticle');

  try {
    const { userId } = req.params;
    const { title, content } = req.body;

    // Create new article logic here

    return sendDataResponse(res, 200, { message: 'Article created successfully' });
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

    return sendDataResponse(res, 200, { message: 'Article edited successfully' });
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

    return sendDataResponse(res, 200, { message: 'Article deleted successfully' });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Delete article`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
