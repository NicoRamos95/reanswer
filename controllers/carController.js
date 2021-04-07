const Car = require('../models/Car')

const carController = {
    addCar : async ( req, res) => {
        const { model, patent, clientId } = req.body
        const carAdd = new Car({ model, patent, clientId})
        carAdd.save()
        .then(async carAdd=> {
            const car = await carAdd.populate('clientId').execPopulate()
            return res.json({success: true, respuesta: car})
        })
        .catch(error => {
          return res.json({success: false, error: error})
        })
    },
    allCars: (req, res) => {
        Car.find()
        .then(data => {
          return res.json({success: true, respuesta: data})
        })
        .catch(error => {
          return res.json({success: false, error: error})
        })
    },
    deleteCar: (req, res) => {
        const { id } = req.body
        Car.findByIdAndDelete({"_id": id})
        .then(car => {
          return res.json({success: true, respuesta: car})
        })
        .catch(errores => {
          return res.json({
            success: false,
            errores:errores,
            mensaje:'No se puede borrar la reparacion en este momento. Intente mas tarde'
          })
        })
    },
}
module.exports = carController