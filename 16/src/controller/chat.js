const moment = require("moment");
const Jsondb = require("../services/jsondb");

class Chat {
  constructor(file) {
    this.db = new Jsondb(file);

    // constructor(table, dbName) {
    //   this.table = table;
    //   this.db = new DB(dbName, table)
  }

  async save(obj) {
    const saveObject = {
      time: moment().format("DD-MM-YYYY HH:ss"),
      ...obj,
    };

    const savedObject = await this.db.create(saveObject);

    return savedObject
  }

  async getAll() {
    const messages = this.db.readFile();
    return messages;
  }
}

const myChatController = new Chat("messages"); // constructor(table, dbName)

module.exports = {
  controller: myChatController,
};
