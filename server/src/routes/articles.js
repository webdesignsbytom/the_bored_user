import { Router } from 'express';
import multer from 'multer';
// Controllers
import { uploadImageToArticle } from '../controllers/articles.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), uploadImageToArticle);

export default router;
