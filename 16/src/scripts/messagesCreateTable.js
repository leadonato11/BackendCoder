// En este script, voy a crear la tabla de messages en mi db sqlite3. Este script pasa solo una vez.

const { options: forSqlite3 } = require("../options/sqlite3");
const knex = require("knex")(forSqlite3);

knex.schema
  .createTable("messages", (table) => {
    // Creo la tabla con las columnas email, timestamp y message (del chat).
    table.string("username");
    table.string("time");
    table.string("message");
  })
  .then(() => {
    console.log(`The table "Messages" has been created!`); // Informo que la tabla se creo ok.
  })
  .catch((error) => {
    console.error(`It was impossible to create the table: ${error}`); // Si la cagamos en algo, aca saldría el error.
  })
  .finally(() => {
    knex.destroy(); // Cierro la conexión con knex
  });
