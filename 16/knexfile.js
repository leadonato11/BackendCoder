// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: 'src/db/ecommerce.sqlite' },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ldonato',
    },
  },
};