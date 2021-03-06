const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse aplication/json
app.use(bodyParser.json());

require('dotenv').config()

const port = process.env.PORT;

//coneccion a  base de datos
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vl0qv.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public")) //Middleware

app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404", {
            titulo: "Error 404",
            descripcion: "Pagino no encontrada"
        }) //Middleware
})

app.listen(port, () => {
    console.log('Servidor a su servicio en el puerto: ', port);
})