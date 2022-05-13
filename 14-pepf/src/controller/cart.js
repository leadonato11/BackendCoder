const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { controller } = require("./articles");
const moment = require("moment");

class Cart {
  constructor(file) {
    this.archivo = `./${file}.json`;
  }

  // Methods read & write file

  async readFile() {
    const file = await fs.promises.readFile(this.archivo, "utf-8"); // esto es un string
    return JSON.parse(file); // aca lo convierto a un json
  }

  async writeFile(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, "\t"));
  }

  // -------------------------------------------------------------------------------

  // Creación del carrito
  async saveCart() {
    const carritos = await this.readFile(); // Leo el archivo json para ver si hay carritos y lo guardo en una constante.

    // Guardo en una variable saveObject, todos los campos requeridos del carrito
    const saveCarrito = {
      id: uuidv4(),
      timestamp: moment().format("DD/MM/YYYY, h:mm:ss a"),
      productos: []
    };
    carritos.push(saveCarrito);
    await this.writeFile(carritos);

    return saveCarrito;
  }

  // Number - Recibe un id de carrito y otro de producto, ambos numéricos y guarda el producto en el carrito.
  async saveProduct(idCart, idProd) {
    const carrito = await this.getById(idCart); // Traigo el carrito segun el id
    const product = await controller.getById(idProd); //Traigo el producto segun el id

    carrito.productos.push(product); // Agrego el producto al carrito
    const carritos = await this.readFile(); // Busco todos los carritos existentes
    const index = carritos.findIndex((unCarrito) => unCarrito.id === idCart);
    carritos.splice(index, 1, carrito);

    await this.writeFile(carritos);

    return carritos
  }

  // Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(number) {
    const carritos = await this.readFile(); // Leo el archivo y guardo el contenido en articles
    const index = carritos.findIndex((carrito) => {
      // busco en articles si está el id que pasé por param. Si está, retorno true.
      if (carrito.id === number) {
        return true;
      } else {
        return false;
      }
    });
    if (index === -1) {
      // Si el id no está o es false, retorno null
      return null;
    }
    return carritos[index]; // Retorno esta función con el articulo cuyo id pasé por param, si es que está.
  }

  // Object[] - // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    const carritos = this.readFile();
    return carritos;
  }

  // void - Elimina del archivo el objeto con el id buscado.
  async deleteById(number) {
    const carritos = await this.readFile(); // Leo el archivo y guardo el contenido en articles
    const carritosFiltered = carritos.filter((carrito) => carrito.id != number); // Filtro por el param que pasé. Si está, lo saco del array.
    await this.writeFile(carritosFiltered);
  }

  // void - Elimina un producto del carrito según el id pasado.
  async deleteProductById(idCarrito,idProd) {
    const carrito = await this.getById(idCarrito);
    const producto = idProd

    const productoABorrar = carrito.productos.filter(
      (unProducto) => unProducto.id = producto
    );
    console.log(productoABorrar)

    await this.writeFile(productoABorrar);
  }

  // void - Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    const emptyArr = [];
    await this.writeFile(emptyArr);
  }

  // Object - Actualiza un producto.
  async update(id, newArticle) {
    const carritos = await this.readFile();
    const index = carritos.findIndex((carrito) => carrito.id === id);

    if (index < 0) {
      throw new Error("No existe tal carrito");
    }

    const articleUpdate = {
      id,
      ...newArticle,
    };

    carritos.splice(index, 1, articleUpdate);
    await this.writeFile(carritos);
    const carritoEdited = await this.readFile();
    return carritoEdited[index];
  }
}

const myCartController = new Cart("carrito");

module.exports = {
  controller: myCartController,
};
