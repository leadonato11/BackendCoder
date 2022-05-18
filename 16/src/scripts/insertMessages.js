const { options: forSqlite3 } = require("../options/sqlite3"); // Importo la conexion con la base de datos sqlite3
const knex = require("knex")(forSqlite3);

const messages = [
  {
    time: "03-05-2022 12:40",
    username: "leandro@gmail.com",
    message: "Hola soy Lea!",
  },
  {
    time: "03-05-2022 13:06",
    username: "lea@gmail.com",
    message: "Hola papá!",
  },
  {
    time: "03-05-2022 13:04",
    username: "lean@hotmail.com",
    message: "Aca llegué",
  },
];

knex("messages")
  .insert(messages)
  .then(() => console.log(`Messages inserted!`))
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });
