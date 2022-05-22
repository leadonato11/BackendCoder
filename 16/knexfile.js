// Update with your config settings.

module.exports = {
  sqlite3: {
    client: 'sqlite3',
    connection: { filename: 'src/db/ecommerce.sqlite' },
    useNullAsDefault: true,
  },

  mysql: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ldonato',
    },
  },
};