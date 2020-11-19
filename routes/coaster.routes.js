const { Router } = require('express')
const express = require('express')
const router = express.Router()

const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')


// -- ENDPOINTS COASTERS --

// -- ID 3. Muestra el formulario para crear una montaña rusa --
router.get('/new', (req, res) => {
    
    Park
        .find()
        .then(theParks => {
            res.render('coasters/new-coaster', { theParks })
        })
        .catch(err => console.log(err))
})


// -- ID 4. Guarda en la BBDD una montaña rusa --
router.post('/new', (req, res) => {

    const { name, description, inversions, length, active, park } = req.body

    Coaster
        .create({ name, description, inversions, length, active, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


// -- ID 5. Muestra la lista de montañas rusas --
router.get('/', (req, res) => {
    
    Coaster
        .find()
        .populate ('park')
        .then(theCoasters => {
            res.render('coasters/coasters-index', { theCoasters })
        })
        .catch(err => console.log(err))   
})


// -- ID 7. Elimina de la BBDD la montaña rusa --
router.get('/delete', (req, res) => {

    const coasterId = req.query.id

    Coaster
        .findByIdAndDelete(coasterId)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


// -- ID 8. Muestra el formulario para editar una montaña rusa (render)
router.get('/edit', (req, res) => {

    const coasterId = req.query.id
    
    Park
        .find()
        .then(theParks => {

            Coaster
                .findById(coasterId)
                .populate('park')
                .then(coasterInfo => res.render('coasters/coaster-edit', { coasterInfo, theParks }))
        })
        .catch(err => console.log(err))
})


// -- ID 9. Edita en la BBDD la montaña rusa (gestión)
router.post('/edit', (req, res) => {

    const coasterId = req.query.id

    const { name, description, inversions, length, active, park } = req.body

    Coaster
        .findByIdAndUpdate(coasterId, { name, description, inversions, length, active, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))

})


// -- ID 6. Muestra los detalles de una montaña rusa --
router.get('/:coaster_id', (req, res) => {

    const coasterId = req.params.coaster_id

    Coaster
        .findById(coasterId)
        .populate ('park')
        .then(theCoaster => {
            res.render('coasters/coaster-details', theCoaster)
        })
        .catch(err => console.log(err))
})


module.exports = router