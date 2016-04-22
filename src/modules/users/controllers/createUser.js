import Users from '../../auth/models/users'
import { ApiError } from 'utils/errors'

export default (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(new ApiError(400, 'MISSING_PARAMETER', 'Please pass name and password'));
    }
    const user = new Users({
        username: req.body.username,
        password: req.body.password
    });
    user.save(err => {
        if(err && err.code == 11000) {
            return next(new ApiError(409, 'already_exist', `User with name "${user.username}" already exists`))
        } else if (err) {
            return next(new ApiError(500, 'server_error'))
        }
        res.status(201).json({
            id: user.id,
            username: user.username
        });
    })

}