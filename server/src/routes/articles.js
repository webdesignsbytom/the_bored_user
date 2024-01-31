import { Router } from 'express';
import multer from 'multer';
// Controllers
import { getLatestArticles } from '../controllers/articles.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/get-latest-articles', getLatestArticles);
// router.post('/upload-image', upload.single('image'), uploadImageToArticle);

export default router;
