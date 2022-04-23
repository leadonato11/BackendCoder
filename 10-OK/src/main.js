const express = require("express");
const apiRouter = require('./routes/api')
const mainRouter = require('./routes/mainRouter')

const app = express();

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded())
app.use('/', mainRouter)
app.use('/api', apiRouter)

app.listen(8080, () => {
  console.log("Server up on port 8080");
});