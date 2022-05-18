const { options: forMariaDB } = require("../options/mariaDB"); // Importo la conexion con la base de datos mysql
const knex = require("knex")(forMariaDB);

const products = [
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

knex("products")
  .insert(products)
  .then(() => console.log(`Products inserted!`))
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });
