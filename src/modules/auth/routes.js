import { Router } from 'express'
import { login, validateAcessToken } from './oAuth2Server'
import readMyInfo from './controllers/readMyInfo';

const router = Router();

router.post('/', login);
router.get('/me', validateAcessToken, readMyInfo);

export default router;