const SEED = require('../config/config');
const jwt = require('jsonwebtoken');






exports.vericaToken = function(req, res, next){
    let token = req.query.token;

    jwt.verify( token, SEED.SEED, (err, decoded) => {
        if( err ){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                err
            });
        }

        req.usuario = decoded.usuario; // devuelve el user del token

        next();
    })
}