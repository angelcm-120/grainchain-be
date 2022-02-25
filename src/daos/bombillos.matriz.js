const service = require('../services/response.service')

const getMatriz = async (response) => {
    let fs = require('fs')
    let details = []

    try {
        let data = fs.readFileSync('matriz.txt', 'utf-8')
        if( data !== undefined && data !== null && data?.length > 0) {
            data = data.split('\r\n')
            response.resultado = data
            response.info = undefined
            response.codigo = undefined
        } else {
            response = { ...service.responseSvc(400) }
            details.push('Formato de matriz inválido')
            response.detalles = details    
        }
    }
    catch(err) {
        response = { ...service.responseSvc(404) }
        details.push('Archivo matriz.txt no encontrado')
        response.detalles = details
    }
    return response
}

exports.getMatriz = getMatriz