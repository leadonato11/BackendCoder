const { options: forMariaDB } = require("../options/mariaDB"); // Importo la conexion con la base de datos mysql
const knex = require("knex")(forMariaDB);

const products = [
  {
    title: "Saco",
    price: 334,
    thumbnail:
      "https://d2r9epyceweg5n.cloudfront.net/stores/793/350/products/foto_01111-0b5a547ef4a4c62e1d15377501492307-1024-1024.jpg",
  },
  {
    title: "Sabanas",
    price: 4556,
    thumbnail:
      "https://ockam-cloud-dr.imgix.net/imagenes-s/productos/sabanas-casablanca-9944-oro-x-2-12-144-hilos-lisa-co-11243.jpg?auto=format",
  },
  {
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
