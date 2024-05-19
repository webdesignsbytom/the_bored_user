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
import { addArticleCommentLike, checkForArticleCommentLike, checkForLike, createArticle, createNewCommentForArticle, deleteArticleById, deleteArticleCommentLike, findAllArticles, findArticleById, likeArticle, removeLike } from '../domain/articles.js';
// Image upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
import fs from 'fs';
// Env variables
const SOURCE_URL = env.HTTP_URL

export const getLatestArticles = async (req, res) => {
  console.log('getLatestArticles');

  try {
    const testFolder = './src/assets/images/memes/';
    const imageEndPoint = `${SOURCE_URL}/src/assets/images/memes/`;

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
    const serverError = new ServerErrorEvent(req.user, `Get all latest articles`);
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

    if (!foundArticles) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.articleNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

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
  const { title, content, author, type, tags, headerImages, articleImages } =
    req.body;

  try {
    if (!userId || !title || !content || !author || !type) {
      const missingField = new MissingFieldEvent(
        null,
        'Article creation: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

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
  const { articleId } = req.params;

  try {
    const foundArticle = await findArticleById(articleId);
    console.log('foundArticles', foundArticle);

    if (!foundArticle) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.articleNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // Delete article logic here
    const deletedArticle = await deleteArticleById(articleId);
    console.log('deletedArticles', deletedArticle);

    if (!deletedArticle) {
      const notFound = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.articleNotDeleted
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

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

export const createNewArticleComment = async (req, res) => {
  console.log('createNewArticleComment');

  try {
    const { articleId, userId } = req.params;
    const { content } = req.body;

    if (!articleId || !userId || !content) {
      const missingField = new MissingFieldEvent(
        null,
        'Article comment creation: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const newComment = await createNewCommentForArticle(articleId, userId, content)

    if (!newComment) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createArticleFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    return sendDataResponse(res, 200, { message: 'Comment created successfully', newComment });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Create new article comment`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createArticleLike = async (req, res) => {
  console.log('createArticleLike');

  try {
    const { articleId, userId } = req.params;

    if (!articleId || !userId) {
      const missingField = new MissingFieldEvent(
        null,
        'Article like: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check if the user already liked the article
    const existingLike = await checkForLike(articleId, userId)

    if (existingLike) {
      return sendMessageResponse(res, 400, 'User has already liked this article');
    }

    const newLike = await likeArticle(articleId, userId)

    if (!newLike) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createArticleLikeFailed
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    return sendDataResponse(res, 200, { message: 'Article liked successfully', newLike });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Like article`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const removeArticleLike = async (req, res) => {
  console.log('removeArticleLike');
  const { articleId, userId } = req.params;

  try {

    if (!articleId || !userId) {
      const missingField = new MissingFieldEvent(
        null,
        'Article like removal: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check if the user has liked the article
    const existingLike = await checkForLike(articleId, userId)

    if (!existingLike) {
      return sendMessageResponse(res, 404, 'Like not found');
    }

    await removeLike(articleId, userId)

    return sendDataResponse(res, 200, { message: 'Article like removed successfully' });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Remove article like`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createArticleCommentLike = async (req, res) => {
  console.log('createArticleCommentLike');
  const { articleCommentId, userId } = req.params;

  try {

    if (!articleCommentId || !userId) {
      const missingField = new MissingFieldEvent(
        null,
        'Article comment like: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check if the user has already liked the comment
    const existingLike = await checkForArticleCommentLike(articleCommentId, userId)

    if (existingLike) {
      return sendMessageResponse(res, 400, 'Comment already liked');
    }

    // Create the like
    await addArticleCommentLike(articleCommentId, userId)

    return sendDataResponse(res, 201, { message: 'Article comment liked successfully' });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Create article comment like`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const removeArticleCommentLike = async (req, res) => {
  console.log('removeArticleCommentLike');

  try {
    const { articleCommentId, userId } = req.params;

    if (!articleCommentId || !userId) {
      const missingField = new MissingFieldEvent(
        null,
        'Remove article comment like: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check if the like exists
    const existingLike = await checkForArticleCommentLike(articleCommentId, userId)

    if (!existingLike) {
      return sendMessageResponse(res, 404, 'Like not found');
    }

    // Remove the like
    await deleteArticleCommentLike(articleCommentId, userId)

    return sendDataResponse(res, 200, { message: 'Article comment like removed successfully' });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Remove article comment like`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};