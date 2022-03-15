const express = require('express');

const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async(req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        res.render('mascotas', {
            arrayMascotas: arrayMascotasDB
        });
    } catch (e) {
        console.log(e);
    }

})

module.exports = router;