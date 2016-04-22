import Users from '../../auth/models/users'
import { ApiError } from 'utils/errors'

export default (req, res, next) => {
    console.log(req.user);
    console.log(req.info);
    console.log(req.authInfo);

    res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
}