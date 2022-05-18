// const { v4: uuidv4 } = require("uuid");
// const Jsondb = require('../services/jsondb')

// class Articles {
//   constructor(file) {
//     this.db = new Jsondb(file)
//   }

//   // -------------------------------------------------------------------------------

//   // Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
//   async save(obj) {
//     const articles = await this.db.readFile();

//     const saveObject = {
//       id: uuidv4(),
//       ...obj, // incluye todos los campos del objeto
//     };
//     articles.push(saveObject);
//     await this.db.writeFile(articles);
//     return saveObject
//   }

//   // Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
//   async getById(number) {
//     const articles = await this.db.readFile(); // Leo el archivo y guardo el contenido en articles
//     const index = articles.findIndex((product) => {
//       // busco en articles si está el id que pasé por param. Si está, retorno true.
//       if (product.id === number) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//     if (index === -1) {
//       // Si el id no está o es false, retorno null
//       return null;
//     }
//     return articles[index]; // Retorno esta función con el articulo cuyo id pasé por param, si es que está.
//   }

//   // Object[] - // Devuelve un array con los objetos presentes en el archivo.
//   async getAll() {
//     const articles = this.db.readFile();
//     return articles;
//   }

//   // void - Elimina del archivo el objeto con el id buscado.
//   async deleteById(number) {
//     const articles = await this.db.readFile(); // Leo el archivo y guardo el contenido en articles
//     const articlesFiltered = articles.filter((product) => product.id != number); // Filtro por el param que pasé. Si está, lo saco del array.
//     await this.db.writeFile(articlesFiltered);
//   }

//   // void - Elimina todos los objetos presentes en el archivo.
//   async deleteAll() {
//     const emptyArr = [];
//     await this.db.writeFile(emptyArr);
//   }

//   // Object - Actualiza un producto.
//   async update(id, newArticle) {

//     const articles = await this.db.readFile();

//     const index = articles.findIndex(article => article.id === id);

//     if (index < 0) {
//       throw new Error("No existe tal producto");
//     }

//     const articleUpdate = {
//       id,
//       ...newArticle,
//     };

//     articles.splice(index, 1, articleUpdate);
//     await this.db.writeFile(articles)
//     const articleEdited = await this.db.readFile()
//     return articleEdited[index]
//   }
// }

// const myArticlesController = new Articles("contenedor");

// module.exports = {
//   controller: myArticlesController,
// };


import { DBService } from '../services/db';

const tableName = 'products';

export const checkBodyProduct = async (req, res, next) => {
  const { nombre, descripcion, stock, precio, category_id } = req.body;

  if (!nombre || !descripcion || !stock || !precio || !category_id)
    return res.status(400).json({
      msg: 'missing Body fields',
    });

  next();
};

export const getAllProducts = async (req, res) => {
  try {
    const items = await DBService.get(tableName);

    res.json({
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await DBService.get(tableName, id);

    if (!item.length)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    res.json({
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, stock, precio, category_id } = req.body;

    const data = {
      nombre,
      descripcion,
      stock,
      precio,
      category_id,
    };

    const newId = await DBService.create(tableName, data);

    const newProduct = await DBService.get(tableName, newId);

    res.json({
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, stock, precio, category_id } = req.body;

    let item = await DBService.get(tableName, id);

    if (!item.length)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    const data = {
      nombre,
      descripcion,
      stock,
      precio,
      category_id,
    };

    DBService.update(tableName, id, data);

    item = await DBService.get(tableName, id);
    res.json({
      msg: 'Product updated',
      item,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    DBService.delete(tableName, id);
    res.json({
      msg: 'product deleted',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};