require('dotenv').config();

const env = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    httpsPrivateKey: process.env.HTTPS_PRIVATE_KEY_PATH,
    httpsCertificate: process.env.HTTPS_CERTIFICATE_PATH,
    host: process.env.HOST,
    client_host: process.env.CLIENT_HOST,
    client_host_prod: process.env.CLIENT_HOST_PROD,
    token_secret: process.env.TOKEN_SECRET,
    encryption_key: process.env.ENCRYPTION_KEY,
    firebase_url: process.env.FIREBASE_URL,
    db_type: process.env.DB_TYPE,
    log_path: process.env.LOG_PATH,
    cache_path: process.env.LOG_PATH,
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        Bucket: process.env.AWS_BUCKET_NAME
    },
    sequelize: {
        database: process.env.MYSQL_DB,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
    },
    mongoose: {
        database: process.env.MONGO_DB,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
}

module.exports = env;