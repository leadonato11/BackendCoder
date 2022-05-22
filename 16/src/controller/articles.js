const DB = require("../services/db");

class Articles {
  constructor(table, dbName) {
    this.table = table;
    this.db = new DB(dbName, table)
  }

  // -------------------------------------------------------------------------------

  // Object[] - Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    const articles = await this.db.get();
    return articles;
  }

  // Object[] - Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(id) {
    const findArticle = await this.db.get(id); // Leo el archivo y guardo el contenido en article
    const article = findArticle[0]; // Lo asigno al primer elemento

    return article || null;
  }

  // Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(obj) {
    const savedObject = await this.db.create(obj);

    return savedObject;
  }

  // Object - Actualiza un producto.
  async update(id, newArticle) {
    const countUpdated = await this.db.update(id, newArticle);

    console.log(countUpdated);

    if (countUpdated === 0) throw new Error("No existe tal producto");

    const articleUpdated = await this.db.get(id) // Esto me devuelve un array
    return articleUpdated[0]; // Aca voy a mostrar el primer elemento de ese array (ya filtré por id, asi que mostrará el que tenga el id indicado)
  }

  // void - Elimina del archivo el objeto con el id buscado.
  async deleteById(id) {
    await this.db.delete(id)
  }
}

const myArticlesController = new Articles("products", "mysql");

module.exports = {
  controller: myArticlesController,
};
