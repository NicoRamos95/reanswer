const Client = require('../models/Client')

const clientController = {
    addClient: async (req, res) => {
        const {firstName, lastname, email} = req.body
        var errores = []
        const  clientExist = await Client.findOne({ email: email })
        if ( clientExist ) {
            errores.push('El cliente ya esta registrado porque el mail esta usado, use otro mail')
        }
        if ( errores.length === 0) {
            var newClient = new Client({ firstName, lastname, email })
            var clientSave = await newClient.save()
        }
        return res.json({
            success: errores.length === 0 ? true : false, 
            errores: errores,            
            response: errores.length === 0 && {
                firstName: clientSave.firstName, lastname: clientSave.lastname, email: clientSave.email
            }}) 
    },
    allclient: (req, res) => {
        Client.find()
        .then(data => {
          return res.json({success: true, respuesta: data})
        })
        .catch(error => {
          return res.json({success: false, error: error})
        })
    },
    deleteClient: async (req, res) => {
        try { 
            const {id} = req.body
            await Client.findOneAndDelete({ _id: id })
            const response = await Client.find()
            .then(data => { 
                res.json({ success: true, data }) 
            })
        } catch (error) {
            res.json({ success: false, error })
        }
    }
}

module.exports = clientController