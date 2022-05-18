// Creo la conexion con mi base de datos mysql de Workbench.

const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ldonato",
  },
  pool: { min: 0, max: 7 },
  useNullAsDefault: true,
};

console.log("Products database connection... ok!");

module.exports = {
  options,
};
