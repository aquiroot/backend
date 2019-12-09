// requires

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// import

const appRoutes = require('./routes/root');
const userRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');

// Init variables

const app = express();
const port = 3000;


// Body parser ( transforma los datos de post en objeto json )

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// Conexion a DB

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/baseDB', { useUnifiedTopology: true,
                                                          useNewUrlParser: true,
}).then( () => console.log('DB Connected successfully'))
.catch( err => {
console.log(`Database error:`, err);
});


// Middlewares
app.use('/login', loginRoutes);
app.use('/usuario', userRoutes);
app.use('/', appRoutes);


// Escuchar peticiones

app.listen(port, () => {
    console.log(`Server run on port`, port);
});