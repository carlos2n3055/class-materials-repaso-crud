const express = require('express')
const router = express.Router()

const Park = require('./../models/park.model')


// -- ENDPOINTS PARK --

// -- ID 1. Muestra el formulario para crear un parque --
router.get('/new', (req, res) => res.render('parks/new-park'))


// -- ID 2. Guarda en la BBDD un parque --
router.post('/new', (req, res) => {

    const { name, description, active } = req.body

    Park
        .create({ name, description, active })
        .then(() => res.redirect('/parks'))
        .catch(err => console.log(err))
})













module.exports = router