import { Router } from 'express';
import multer from 'multer';
// Controllers
import { createArticleCommentLike, createArticleLike, createNewArticle, createNewArticleComment, deleteArticle, editArticle, getAllArticles, getAllArticlesByType, getLatestArticles, removeArticleCommentLike, removeArticleLike } from '../controllers/articles.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/get-latest-articles', getLatestArticles);
router.get('/get-all-articles', getAllArticles);
router.get('/get-all-articles-by-type', getAllArticlesByType);
router.post('/create-new-article/:userId', createNewArticle);
router.put('/edit-article/:articleId', editArticle);
router.delete('/delete-article/:articleId', deleteArticle);
// User interactions
router.post('/like-article/:articleId/:userId', createArticleLike);
router.delete('/remove-article-like/:articleId/:userId', removeArticleLike);
router.post('/create-new-article-comment/:articleId/:userId', createNewArticleComment);
router.post('/like-article-comment/:articleCommentId/:userId', createArticleCommentLike);
router.delete('/remove-article-comment-like/:articleCommentId/:userId', removeArticleCommentLike);

export default router;
