const express = require('express');

const app = express();



// Rutas

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion correcta'
    })
});




// exportar

module.exports = app;