const fs = require("fs");

class Jsondb {
  constructor(file) {
    this.archivo = `./${file}.json`;
  }

  // Methods read & write

  async readFile() {
    const file = await fs.promises.readFile(this.archivo, "utf-8"); // esto es un string
    return JSON.parse(file); // aca lo convierto a un json
  }

  async writeFile(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, "\t"));
  }
}

module.exports = Jsondb;
