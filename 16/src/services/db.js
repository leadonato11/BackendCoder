import knex from "knex";
import dbConfig from "../../knexfile";

class DB {
  constructor() {
    const environment = process.env.NODE_ENV || "development";
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable("products").then((exists) => {
      if (exists) return;
      console.log("Products table was created!");

      return this.connection.schema.createTable("products", async (table) => {
        table.increments("id");
        table.string("title");
        table.float("price");
        table.string("thumbnail");

        const initProducts = [
          {
            id: "6cb3c431-276a-4b29-95cf-ea5b66ae8cf1",
            title: "Saco",
            price: 334,
            thumbnail:
              "https://d2r9epyceweg5n.cloudfront.net/stores/793/350/products/foto_01111-0b5a547ef4a4c62e1d15377501492307-1024-1024.jpg",
          },
          {
            id: "e2eb5f9f-43b8-4597-ac5a-6c27b32b9c44",
            title: "Sabanas",
            price: 4556,
            thumbnail:
              "https://ockam-cloud-dr.imgix.net/imagenes-s/productos/sabanas-casablanca-9944-oro-x-2-12-144-hilos-lisa-co-11243.jpg?auto=format",
          },
          {
            id: "800ec441-88a2-421d-b3ad-926c5757d69d",
            title: "Camisa",
            price: 9987,
            thumbnail:
              "https://www.texora.cl/554-zoom/camisa-oxford-classic-m-l-55-alg-45-poly-blanco-t-xs.jpg",
          },
        ];
        const createProducts = initProducts.map((aProduct) =>
          this.create("products", aProduct)
        );
        await Promise.all(createProducts);
      });
    });
  }

  getAllProds(tableName) {
    if (tableName) return this.connection(tableName).select("*", tableName);

    return this.connection(tableName);
  }

  getProdbyId(tableName, id) {
    if (id) return this.connection(tableName).where("id", id);

    return this.connection(tableName);
  }

  saveProd(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  updateProd(tableName, id, data) {
    return this.connection(tableName).where("id", id).update(data);
  }

  deleteProd(tableName, id) {
    return this.connection(tableName).where("id", id).del();
  }
}

export const DBService = new DB();
