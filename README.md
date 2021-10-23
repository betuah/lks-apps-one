# LKS APPS 01

> **Desc :** Deploy this apps to your aws. Create a scalable, available, reliable and secure infrastructure for this apps.

<hr>

## Server Config Setup
> Create .env file in Server root folder
```sh
NODE_ENV=production
PORT=8000
DB_TYPE=YOUR_DATABASE_TYPE
MYSQL_DB=YOUR_MYSQL_DATABASE_NAME
MYSQL_USERNAME=YOUR_MYSQL_USERNAME
MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD
MYSQL_HOST=YOUR_MYSQL_HOST
MYSQL_PORT=YOUR_MYSQL_PORT
REDIS_HOST=YOUR_REDIS_HOST
REDIS_PORT=YOUR_REDIS_PORT
REDIS_PASSWORD=YOUR_REDIS_PASSWORD
AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS
AWS_BUCKET_NAME=YOUR_AWS_BUCKET_NAME
LOG_PATH=YOUR_LOG_FOLDER_LOCATION
CACHE_PATH=YOUR_CACHE_PATH_FILE_LOCATION_STORE
```
## Running Server (API Backend)
```sh
$ npm run start-prod # Start server on production mode
$ npm run stop-prod # Stop server on production mode
```

<hr>

## Client Config Setup
> Create .env file in Client root folder
```sh
API_URL=YOUR_API_BACKEND_SERVER_HOST # For example http://localhost:8000
```
## Running Client (Front End)
> Client service has two options for deployment.

### 1st Option - Server Deployment
```sh
$ npm run build # Firstly You need to run this command to create .nuxt directory with everything inside ready to start
$ npm run start # Start your client apps in server-side production mode

```
### 2nd Option - Static Deployment (Pre-rendered)
> Gives you the ability to host your web application on any static hosting, the static source code will be generated in *dist folder*
```sh
$ npm run generate # Generate static source code
```

<hr>