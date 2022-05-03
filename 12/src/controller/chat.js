const moment = require("moment");
const Jsondb = require("../services/jsondb");

class Chat {
  constructor(file) {
    this.db = new Jsondb(file);
  }

  async save(obj) {
    const messages = await this.db.readFile();

    const saveObject = {
      time: moment().format("DD-MM-YYYY HH:ss"),
      ...obj,
    };
    messages.push(saveObject);
    await this.db.writeFile(messages);
    return saveObject;
  }

  async getAll() {
    const messages = this.db.readFile();
    return messages;
  }
}

const myChatController = new Chat("messages");

module.exports = {
  controller: myChatController,
};
