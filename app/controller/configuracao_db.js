const { tbl_configuracoes } = require('../models');
const util = require('./util');
const db = require('../models')

const buscarConfiguracao = (req, res, next) => {
	tbl_configuracoes.findAll()
		.then((configuracoes) => {
			if ((configuracoes == null) || (configuracoes == undefined) || (configuracoes.length == 0)) {
				res.status(404)
					.send(util.response("Not Found", 404, configuracoes, "api/configuracoes", "GET", null))
			}
			else {
				res.status(200)
					.send(util.response("Buscar Configurações", 200, configuracoes, "api/configuracoes", "GET", null))
			}
		}).catch((e) => {
			let error = console.error(e)
			res.status(400)
				.send(util.response("Error", 400, 'Ocorreu um error ao buscar as configurações', "api/configuracoes", "GET", error))
		})
}

module.exports = {
	buscarConfiguracao
}
