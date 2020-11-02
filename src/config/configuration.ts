export default () => ({

  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
  }

});
