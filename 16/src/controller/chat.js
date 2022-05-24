const moment = require("moment");
const DB = require("../services/db");

class Chat {
  constructor(table, dbName) {
    this.table = table;
    this.db = new DB(dbName, table);
  }

  async save(obj) {
    const saveObject = {
      time: moment().format("DD-MM-YYYY HH:ss"),
      ...obj,
    };
    const savedId = await this.db.create(saveObject)
    const savedObject = await this.db.get(savedId);
    return savedObject[0];
  }

  async getAll() {
    const messages = await this.db.get();
    return messages;
  }
}

const myChatController = new Chat("messages", "sqlite3"); // constructor(table, dbName)

module.exports = {
  controller: myChatController,
};
