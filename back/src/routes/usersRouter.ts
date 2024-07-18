import {Router} from 'express';
import { getAllUsers, getUserById, userLogin, usersRegister } from '../controllers/usersController';
import checkCredential from '../middlewares/checkCredential';


const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', checkCredential ,usersRegister);
usersRouter.post('/login', checkCredential, userLogin);


export default usersRouter;