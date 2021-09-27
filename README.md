# LKS APPS 01

> **Desc :** Deploy this apps to your aws.

<hr>

## Server Config Setup
> Create .env file in Server folder
```sh
PORT=8000
NODE_ENV=dev | prod
HTTPS_PRIVATE_KEY_PATH=./ssl/server.key
HTTPS_CERTIFICATE_PATH=./ssl/server.cert
HOST=YOUR_HOST | eg. http://locahost
TOKEN_SECRET=YOUR_TOKEN_SECRET
ENCRYPTION_KEY=YOUR_ENCRYPTION_KEY
ORIGIN=YOUR_ORIGIN
MONGO_DB_LMS=YOUR_LMS_DB_NAME
MONGO_USERNAME_LMS=YOUR_LMS_DB_USERNAME
MONGO_PASSWORD_LMS=YOUR_LMS_DB_PASSWORD
MONGO_DB_LOG=YOUR_LOG_DB_NAME
MONGO_USERNAME_LOG=YOUR_LOG_DB_USERNAME
MONGO_PASSWORD_LOG=YOUR_LOG_DB_PASSWORD
MONGO_HOST=YOUR_MONGO_HOST
MONGO_PORT=YOUR_MONGO_PORT
```

## Running Server App
```sh
$ npm run dev # dev for Running development apps and prod for Running production apps

```

<hr>