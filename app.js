// requires

const express = require('express');
const mongoose = require('mongoose');




// Init variables

const app = express();
const port = 3000;


// Conxion a DB

mongoose.connect('mongodb://localhost:27017/baseDB', { useUnifiedTopology: true,
                                                          useNewUrlParser: true,
}).then( () => console.log('DB Connected successfully'))
.catch( err => {
console.log(`Database error:`, err);
});

// Rutas

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion correcta'
    })
});


// Escuchar peticiones

app.listen(port, () => {
    console.log(`Server run on port`, port);
});