const express = require('express');

const movieRouter = require('./router/movie');
const categoriesRouter = require('./router/categories');
const movcatRouter = require('./router/movcat')

const app = express();
const port = 2019;


app.use(express.json());
app.use(movieRouter);
app.use(categoriesRouter);
app.use(movcatRouter);




app.listen(port, () => {
    console.log("API running at Port: " + port)
})