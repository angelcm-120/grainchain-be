const catchAsync = require('../utils/catchAsync')
const service = require('../services/response.service')
const daos = require('../daos/bombillos.matriz')

const getMatriz = catchAsync(async (req, res) => {
    let response = { ...service.responseSvc(200) }

    response = await daos.getMatriz(response)
    

    res.status(response.valor)
    res.send(service.cleanResponse(response))
})

module.exports = { getMatriz }
