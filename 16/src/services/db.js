const knex = require("knex");
const knexConfigs = require("../../knexfile");
const denv = require('dotenv')
denv.config();

class DB {
  constructor(dbConfig, tableName) {
    this.connection = knex(knexConfigs[dbConfig]); // Aca le voy a pasar la config correspondiente sqlite3 o mysql.
    this.table = tableName
  }

  // Select
  get(id) {
    if (id) return this.connection(this.table).where("id", id);

    return this.connection(this.table);
  }

  // Insert
  create(data) {
    return this.connection(this.table).insert(data);
  }

  // Update
  update(id, data) {
    return this.connection(this.table).where("id", id).update(data);
  }

  // Delete
  delete(id) {
    return this.connection(this.table).where("id", id).del();
  }
}

module.exports = DB
