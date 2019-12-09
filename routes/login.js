const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config');

const app = express();

const Usuario = require('../models/usuario');


app.post('/', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if ( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if ( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credencial incorrecta',
                errors: err
            });
        }

        if( !bcrypt.compareSync ( body.password, usuarioDB.password) ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credencial incorrecta',
                errors: err
            });
        }

        usuarioDB.password = ':)';
        let token = jwt.sign({ usuario: usuarioDB }, SEED.SEED,{ expiresIn: 14400 }); // 4 hs

        res.status(200).json({
            ok: true,
            mensaje: 'usuario logueado',
            token
        });

    })
});







module.exports = app;