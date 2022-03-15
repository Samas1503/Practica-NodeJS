const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // console.log(__dirname);
    res.render("index", { titulo: 'Mi titulo dinamico' });
})

router.get('/servicios', (req, res) => {
    res.render("servicios", { titulo: 'Este es un mensaje dinamico de servicios' });
})

router.get('/contacto', (req, res) => {
    res.render("contacto", { titulo: 'Este es un mensaje dinamico de contacto' });
})

module.exports = router;