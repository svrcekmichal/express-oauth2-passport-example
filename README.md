# Express-oAuth2-passport-example

Warning: Under construction

## Installation

```js

npm install

//in two shells

npm start

npm start:db

```

## Endpoints

### POST /api/users

```js
{
  "username":"svrcekmichal",
  "password":"someSuperStrongPassword"
}
```

Response:

```js
201 CREATED
{
  "id": "5719d07b320f3c637e08fca5",
  "username": "svrcekmichal"
}
```

OR

 ```js
409 CONFLICT
{
  "error": {
    "code": "already_exist",
    "description": "User with name \"svrcekmichal\" already exists"
  }
}
 ```

### POST /api/auth

```js
{
  "grant_type":"password",
  "client_id":"test",
  "client_secret":"testSecret",
  "username":"svrcekmichal",
  "password":"someSuperStrongPassword"
}
 ```

Response:

```js
200 OK
{
  "access_token": "B1TJkrwia4FCRwFFqQY2FFec1rgbC8y4...",
  "refresh_token": "QkB1wubtX72kVi1szVGRxnhRK79GLNV...",
  "expires_in": 1461314982,
  "token_type": "Bearer"
}
 ```

OR

```js
400 BAD REQUEST
{
  "error": "invalid_client",
  "error_description": "The client authentication failed for some reason (for example, an unknown client, no client authentication included, or an unsupported authentication method)."
}
 ```

```js
403 FORBIDDEN
{
  "error": "invalid_grant",
  "error_description": "Invalid resource owner credentials"
}
 ```

```js
501 NOT IMPLEMENTED
{
  "error": "unsupported_grant_type",
  "error_description": "Unsupported grant type: passwordd"
}
 ```

### GET /api/auth/me

```js 
Headers: 
Authorization: Bearer B1TJkrwia4FCRwFFqQY2FFec1rgbC8y4...
```

Response:

```js
200 OK
{
  "name": "svrcemichal",
  "scope": "*"
}
```

OR

 ```js
400 BAD REQUEST
{
  "error": {
    "code": "invalid_token",
    "description": "The client authentication failed because access token is invalid."
  }
}
 ```