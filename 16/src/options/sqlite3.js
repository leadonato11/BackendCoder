const options = {
  client: "sqlite3",
  connection: {
    filename: "src/db/ecommerce.sqlite3",
  },
  useNullAsDefault: true, // Para que las keys undefined se reemplacen con NULL en lugar de DEFAULT.
};

console.log("Messages database connection... ok!");

module.exports = {
  options,
};
