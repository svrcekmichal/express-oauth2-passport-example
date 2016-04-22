export const types = {
    INVALID_REQUEST: 'invalid_request',
    INVALID_CLIENT: 'invalid_client',
    INVALID_TOKEN: 'invalid_token',
    INVALID_GRANT: 'invalid_grant',
    UNAUTHORIZED_CLIENT: 'unauthorized_client',
    UNSUPPORTED_GRANT_TYPE: 'unsupported_grant_type',
    INVALID_SCOPE: 'invalid_scope',
};


const message = {
    [types.INVALID_REQUEST]: 'The request is missing a required parameter, includes an unsupported ' +
                    'parameter value (other than the grant type), repeats a parameter, includes multiple credentials, ' +
                    'utilizes more than one mechanism for authenticating the client, or is otherwise malformed.',
    [types.INVALID_CLIENT]: 'The client authentication failed for some reason (for example, an unknown client, no client ' +
                    'authentication included, or an unsupported authentication method).',
    [types.INVALID_TOKEN]: 'The client authentication failed because access token is invalid.',
    [types.INVALID_GRANT]: 'The provided authorization grant or the refresh token is invalid, expired, revoked, does not match ' +
                    'the redirection URI used in the authorization request, or was issued to another client.',
    [types.UNAUTHORIZED_CLIENT]: 'The authenticated client is not authorized to use this authorization grant type.',
    [types.UNSUPPORTED_GRANT_TYPE]: 'The authorization grant type is not supported by the authorization server.',
    [types.INVALID_SCOPE]: 'The requested scope is invalid, unknown, malformed, or exceeds the scope granted by the user.',
};

function OAuthError(type) {
    this.status = 400;
    this.code = type;
    this.message = message[type];
}
OAuthError.prototype = new Error;
OAuthError.prototype.toJSON = function(){
    return {
        code: this.code,
        description: this.message
    }
};

export default OAuthError;
