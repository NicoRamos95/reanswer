const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')
const carController = require('../controllers/carController')
const repairController = require('../controllers/repairController')

router.route('/client')
.post(clientController.addClient)
.get(clientController.allclient)
.delete(clientController.deleteClient)

router.route('/cars')
.post(carController.addCar)
.put(carController.deleteCar)

router.route('/cars/:id')
.get(carController.allCars)

router.route('/repair')
.post(repairController.addRepair)
.put(repairController.deleteRepair)

module.exports = router