import { Router } from 'express';
import {
  getAllUsers,
  registerNewUser,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmail
} from '../controllers/users.js';
import { validateAuthentication, validateAdminRole } from '../middleware/auth.js';

const router = Router();

router.get('/', validateAuthentication, validateAdminRole, getAllUsers);
router.post('/register', registerNewUser);
router.get('/get-user-by-id/:userId', getUserById); 
router.get('/get-user-by-email/:userEmail', getUserByEmail); 
router.put('/account/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', validateAuthentication, validateAdminRole, deleteUser);

export default router;
