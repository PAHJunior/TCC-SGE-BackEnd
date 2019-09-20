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
const msg_error = (titulo, message, value, type, validatorKey) => {
    return {
        titulo: titulo,
        message: message,
        value: value,
        type: type,
        validatorKey: validatorKey,
    }
}

module.exports = {
    msg_error,
    timestamp,
    response
}