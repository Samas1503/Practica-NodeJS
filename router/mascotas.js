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

router.get('/crear', (req, res) => {
    try {
        res.render('crear')
    } catch (e) {
        console.log(e);
    }
})

router.post('/', async(req, res) => {
    const body = req.body;
    console.log(body);
    try {
        // const mascotaDB = new Mascota(body);
        // await mascotaDB.save();

        await Mascota.create(body);

        res.redirect('/mascotas')
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findOne({ _id: id });
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (e) {
        console.log(e);
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el ID de la mascota'
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        }
    } catch (e) {
        console.log(e);
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false });
        res.json({
            estado: true,
            mesaje: 'Editado'
        })
    } catch (e) {
        console.log(e);
        res.json({
            estado: false,
            mesaje: 'Fallo Editar'
        })
    }
})

module.exports = router;