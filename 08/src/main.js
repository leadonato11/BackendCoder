const express = require("express");
const mainRouter = require('./routes')

const app = express();

app.listen(8080, () => {
  console.log("Server up on port 8080");
});

app.use('/api', mainRouter)