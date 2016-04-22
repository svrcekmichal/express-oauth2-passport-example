import { Router } from 'express'
import passport from 'passport';

import createUser from './controllers/createUser'
import readUser from './controllers/readUser'
import readUsers from './controllers/readUsers'
import updateUser from './controllers/updateUser'

const router = Router();

router.get('/:id', readUser);
router.get('/', readUsers);
router.post('/', createUser);
router.put('/:id', passport.authenticate('bearer', { session: false }), updateUser);

export default router;