import securityConfig from 'config/security';
import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as ClientPasswordStrategy} from 'passport-oauth2-client-password';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import AccessTokenModel from './models/accessToken'
import ClientModel from './models/client'
import UserModel from './models/users'
import { ApiError } from 'utils/errors';
import OAuthError, {types} from './error';

const clientVerification = (clientId, clientSecret, done) => {
    ClientModel.findOne({clientId}).then(client => {
        if (!client || client.clientSecret != clientSecret) {
            return done(new OAuthError(types.INVALID_CLIENT), false);
        }
        return done(null, client);
    }, error => done(new ApiError(500, 'INTERNAL_SERVER_ERROR')));
};

passport.use(new BasicStrategy(clientVerification));

passport.use(new ClientPasswordStrategy(clientVerification));

passport.use(new BearerStrategy(function (accessToken, done) {
    AccessTokenModel.findOne({token: accessToken}).then(token => {
        if(!token) {
            return done(new OAuthError(types.INVALID_TOKEN));
        }

        if (Math.round((Date.now() - token.created) / 1000) > securityConfig.tokenLife) {
            return done(new OAuthError(types.INVALID_TOKEN), false, {message: 'Token expired'});
        }
        UserModel.findById(token.userId).then(user => {
            if (!user) {
                return done(ApiError(404, 'not_found'), false, {message: 'Unknown user'});
            }
            var info = {scope: '*'};
            return done(null, user, info);
        }, error => done(new ApiError(500)))
    }).catch(error => done(new ApiError(500)));
}));
