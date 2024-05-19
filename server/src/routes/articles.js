import { Router } from 'express';
import multer from 'multer';
// Controllers
import { createNewArticle, deleteArticle, editArticle, getAllArticles, getAllArticlesByType, getLatestArticles } from '../controllers/articles.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/get-latest-articles', getLatestArticles);
router.get('/get-all-articles', getAllArticles);
router.get('/get-all-articles-by-type', getAllArticlesByType);
router.post('/create-new-article/:userId', createNewArticle);
router.put('/edit-article/:articleId', editArticle);
router.delete('/delete-article/:articleId', deleteArticle);

export default router;
