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

module.exports = {
    msg_error,
    timestamp,
    response,
    isDiaUtil
}