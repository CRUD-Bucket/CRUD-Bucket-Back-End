# CRUD Bucket API

CRUD Bucket is a web application which allows users to easily upload, organize
and share files. All users can view and download all other users’ files.
Users can rename and delete files their own files, as well. Date uploaded and
date modified are automatically generated and shown for each file. Files can be
organized into folders, and folders can be created within other folders
allowing users to organize their files as they like.

## Links

[Deployed Back-end API](https://floating-tundra-60505.herokuapp.com/)

[Front-end Repo](https://github.com/CRUD-Bucket/CRUD-Bucket-Front-End)

## API

Use this API to communicate with the CRUD-Bucket Back End.

### Authentication

| Verb   | URI Pattern            | Controller#Action    |
|--------|------------------------|----------------------|
| POST   | `/sign-up`             | `users#signup`       |
| POST   | `/sign-in`             | `users#signin`       |
| PATCH  | `/change-password/:id` | `users#changepw`     |
| DELETE | `/sign-out/:id`        | `users#signout`      |

### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

## Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

### GET /users

Request:

```sh
curl --include --request GET http://localhost:3000/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:3000/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

## Folders

| Verb   | URI Pattern            | Controller#Action    |
|--------|------------------------|----------------------|
| POST   | `/rootfolders`         | `folders#createRoot` |
| GET    | `/rootfolders/:path`   | `folders#showRoot`   |
| GET    | `/folders/:path`       | `folders#index`      |
| GET    | `/userfolders`         | `folders#showByOwner`|
| GET    | `/folders`             | `folders#index`      |
| GET    | `/folders/:id`         | `folders#show`       |
| POST   | `/folders`             | `folders#create`     |
| PATCH  | `/folders/:id`         | `folders#update`     |
| DELETE | `/folders/:id`         | `folders#destroy`    |

### POST /rootfolders

Request:

```sh
curl --include --request POST http://localhost:3000/rootfolders \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "exampleFolderName",
      "path": "examplePath",
      "_owner": "exampleUserId"
    }
  }'
```

### GET /folders/:path

Request:

```sh
curl --include --request GET http://localhost:3000/folders/:examplePath \
  --header "Content-Type: application/json"
```

### GET /rootfolders/:path

Request:

```sh
curl --include --request GET http://localhost:3000/rootfolders/:examplePath \
  --header "Content-Type: application/json"
```

### GET /userfolders

Request:

```sh
curl --include --request GET http://localhost:3000/userfolders \
  --header "Content-Type: application/json"
```

### GET /folders

Request:

```sh
curl --include --request GET http://localhost:3000/folders \
  --header "Content-Type: application/json"
```

### GET /folders/:id

Request:

```sh
curl --include --request GET http://localhost:3000/folders/:id \
  --header "Content-Type: application/json"
```

### POST /folders

Request:

```sh
curl --include --request POST http://localhost:3000/folders \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "exampleName",
      "path": "examplePath"
    }
  }'
```

### PATCH /folders/:id

Request:

```sh
curl --include --request PATCH http://localhost:3000/folders/:id \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "exampleName",
      "path": "examplePath"
    }
  }'
```

### DELETE /folders/:id

Request:

```sh
curl --include --request DELETE http://localhost:3000/folders/:id \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
```

## Files

| Verb   | URI Pattern            | Controller#Action    |
|--------|------------------------|----------------------|
| GET    | `/rootfiles/:path`     | `files#showRoot`     |
| GET    | `/files`               | `files#index`        |
| GET    | `/files/:id`           | `files#show`         |
| POST   | `/files`               | `files#create`       |
| PATCH  | `/files/:id`           | `files#update`       |
| DELETE | `/files/:id`           | `files#destroy`      |

### GET /files/:path

Request:

```sh
curl --include --request GET http://localhost:3000/files/:examplePath \
  --header "Content-Type: application/json"
```

### GET /files

Request:

```sh
curl --include --request GET http://localhost:3000/files \
  --header "Content-Type: application/json"
```

### GET /files/:id

Request:

```sh
curl --include --request GET http://localhost:3000/files/:id \
  --header "Content-Type: application/json"
```

### POST /files

Request:

```sh
curl --include --request POST http://localhost:3000/files \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "file": {
      "name": "exampleName",
      "path": "examplePath"
    }
  }'
```

### PATCH /files/:id

Request:

```sh
curl --include --request PATCH http://localhost:3000/files/:id \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "file": {
      "name": "exampleName",
      "path": "examplePath"
    }
  }'
```

### DELETE /files/:id

Request:

```sh
curl --include --request DELETE http://localhost:3000/files/:id \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
```


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
