import oauth2orize from 'oauth2orize';
import passport from 'passport';
import config from 'config/security';
import uid from 'utils/uid';
import UserModel from './models/users';
import AccessTokenModel from './models/accessToken';
import RefreshTokenModel from './models/refreshToken';

const server = oauth2orize.createServer();

const expiresIn = token => parseInt(token.created.getTime() / 1000) + config.tokenLife;

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    UserModel.findOne({username: username}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        if(!user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
        }));

        var accessToken = new AccessTokenModel({token: uid(256), clientId: client.clientId, userId: user.id});
        var refreshToken = new RefreshTokenModel({token: uid(256), clientId: client.clientId, userId: user.id });
        refreshToken.save(function (err) {
            if (err) {
                return done(err);
            }
        });
        var info = {scope: '*'}
        accessToken.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, accessToken.token, refreshToken.token, {'expires_in': expiresIn(token)});
        });
    });
}));

server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            var accessToken = new AccessTokenModel({ token: uid(256), clientId: client.clientId, userId: user.id });
            var refreshToken = new RefreshTokenModel({ token: uid(256), clientId: client.clientId, userId: user.id });
            refreshToken.save(function (err) {
                if (err) { return done(err); }
            });
            var info = { scope: '*' };
            accessToken.save(function (err, token) {
                if (err) { return done(err); }
                done(null, accessToken.token, refreshToken.token, { 'expires_in': expiresIn(accessToken) });
            });
        });
    });
}));

export const login = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session:false}),
    server.token(),
    server.errorHandler()
];

export const validateAcessToken = [
    passport.authenticate('bearer', { session: false })
];
