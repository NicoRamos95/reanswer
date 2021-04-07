const Car = require('../models/Car')

const repairController = {
    addRepair: (req, res) => {
      const { id, description } = req.body
      Car.findOneAndUpdate({ _id: id},
        { $addToSet: { repair: { description: description }}},
        { new:true })
      .then(response => res.json({success: true, response }))
      .catch(error => res.json({success: false, error }))
    },
    deleteRepair: (req, res) => {
        const {id, idRepair} = req.body
        Car.findOneAndUpdate(
            {_id: id},
            {$pull: { repair: { _id: idRepair }}},
            {new: true})
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
    }
}


module.exports = repairController