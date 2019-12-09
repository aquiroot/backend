const express = require('express');
const bcrypt = require('bcryptjs');


// Middelwares
const auth = require('../middlewares/auth');


const app = express();
const Usuario = require('../models/usuario');



// Rutas

app.get('/', (req, res) => {

    Usuario.find({}, 'nombre email role').exec(
        (err, usuarios ) => {
        if ( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los usuarios',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuarios
        });
    })

});



app.post('/', auth.vericaToken, (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioGuardado) => {
        if ( err ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuarioGuardado
        });
    })
});

app.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if ( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario',
                errors: err
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( (err, usuarioGuardado) => {
            if ( err ){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ":)";
    
            res.status(200).json({
                ok: true,
                usuarioGuardado
            });
        })
        
    })
});

app.delete('/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if ( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuarioBorrado
        });
    })
});


// exportar

module.exports = app;