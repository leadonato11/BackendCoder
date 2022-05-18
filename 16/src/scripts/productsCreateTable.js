// En este script, voy a crear la tabla de productos en mi db mysql. Este script pasa solo una vez.

const { options: forMariaDB } = require("../options/mariaDB"); // Importo la conexion con la base de datos mysql
const knex = require("knex")(forMariaDB);

knex.schema
  .createTable("products", (table) => {
    // Creo la tabla con las columnas id, titulo, precio y miniatura (del producto)
    table.increments("id");
    table.string("title");
    table.float("price");
    table.string("thumbnail");
  })
  .then(() => {
    console.log(`The table "Products" has been created!`); // Informo que la tabla se creo ok.
  })
  .catch((error) => {
    console.error(`It was impossible to create the table: ${error}`); // Si la cagamos en algo, aca saldría el error.
  })
  .finally(() => {
    knex.destroy(); // Cierro la conexión con knex
  });
