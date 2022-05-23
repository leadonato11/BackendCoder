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
    const savedObject = await this.db.create(saveObject);
    return savedObject;
  }

  async getAll() {
    const messages = await this.db.get();
    console.log(messages)
    return messages;
  }
}

const myChatController = new Chat("messages", "sqlite3"); // constructor(table, dbName)

module.exports = {
  controller: myChatController,
};
