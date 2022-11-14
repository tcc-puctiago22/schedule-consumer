const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  DB_HOST,
  MONGODB_DOCKER_PORT,
  MONGODB_DATABASE,
} = process.env;


module.exports = {
  url: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${DB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`
};
