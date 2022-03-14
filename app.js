// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('Estoy respondiendo a tu solicitud v2');
// })

// const port = 3000;
// server.listen(port, () => {
//     console.log('Escuchando solicitudes');
// })

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public")) //Middleware

app.get('/', (req, res) => {
    // console.log(__dirname);
    res.render("index", { titulo: 'Mi titulo dinamico' });
})

app.get('/servicios', (req, res) => {
    res.render("servicios", { titulo: 'Este es un mensaje dinamico de servicios' });
})

app.get('/contacto', (req, res) => {
    res.render("contacto", { titulo: 'Este es un mensaje dinamico de contacto' });
})

app.use((req, res, next) => {
    res.status(404).render("404", {
            titulo: "Error 404",
            descripcion: "Pagino no encontrada"
        }) //Middleware
})

app.listen(port, () => {
    console.log('Servidor a su servicio en el puerto: ', port);
})