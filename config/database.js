const mongoose = require('mongoose')
//conectar con la base de datos de mongoos
mongoose.connect(process.env.MONGODB_URI, 
{   useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Database Connectec"))
.catch(error => console.log(error))