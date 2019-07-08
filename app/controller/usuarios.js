const { tbl_usuarios } = require('../models')


const setUser = (req, res, next) => {
    tbl_usuarios.create(req.body)
        .then((user) => [
            res.status(200).send(user)
        ])
        .catch((e) => {
            console.log("Error")
            res.status(400).send({error: e})
        })
}

module.exports = {
    setUser
}