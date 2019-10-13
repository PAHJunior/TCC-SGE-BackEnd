const jwt = require('jsonwebtoken');
const token = require('../../../config/auth.json')

// function retorna YYYY-MM-DD HH:MM:SS
const timestamp = () => {
    let data = new Date()
    let ano, mes, dia, hora, minuto, segundo
    ano = data.getFullYear().toString();
    mes = data.getMonth().toString();
    dia = data.getDay().toString();
    hora = data.getHours().toString();
    minuto = data.getMinutes().toString();
    segundo = data.getSeconds().toString();
    return `${ano}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')} ${hora.padStart(2,'0')}:${minuto.padStart(2,'0')}:${segundo.padStart(2,'0')}`
}

const data_yyymmdd = (data) => {
    let split_data = data.split('-')
    split_data[1] = split_data[1] - 1
    return new Date(split_data[2], split_data[1], split_data[0])
}

const isDiaUtil = () => {
    let isDiaUtil = true;
    let data = new Date();
    // getDay retorna entre 0-6
    // sendo 0 = domingo
    // sendo 6 = sabado
    let dia = data.getDay();

    if ((dia == 0) || (dia == 6)) {
        isDiaUtil = false;
    }

    return isDiaUtil;
}

// mensagem padrão para res.send
const response = (titulo, status, response, url, http, errors) => {
    return {
        titulo: titulo,
        status: status,
        response: response,
        url: url,
        http: http,
        errors: errors
    }
}

// Mensagem padrão para erros
const msg_error = (titulo, message, value, type, validatorKey, status) => {
    return {
        titulo: titulo,
        message: message,
        value: value,
        type: type,
        validatorKey: validatorKey,
        status: status
    }
}

// Funcão que gera um token, 
// parametro a ser recebido será um _id do usuario
// a função gera um token unico com base no secret + _id
// expiresIn = o token irá expirar em 1800 segundos = 30minutos
const generateToken = (params = {}) => {
    return jwt.sign(params, token.secret, {
        expiresIn: '5m',
    })
}

// função para verificar se o token é valido
const isToken = (v_token) => {
    return jwt.verify(v_token, token.secret, (err, decoded) => {
        if (err){
            return false
        }else {
            return true
        }
    })
}

// Metodo para verificar se o token é valido
// Porem com um req, res, next
let verificarToken = (req, res, next) => {
    console.log(req.params.token)
    let token = isToken(req.params.token)
    if (token){
        res.status(200).send(token)
    } else {
        res.status(200).send(token)
    }
}
module.exports = {
    msg_error,
    timestamp,
    response,
    isDiaUtil,
    data_yyymmdd,
    verificarToken,
    generateToken
}