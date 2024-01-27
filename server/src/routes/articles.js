import { Router } from 'express';
import { validateAuthentication, validateDeveloperRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllArticles);

export default router;
