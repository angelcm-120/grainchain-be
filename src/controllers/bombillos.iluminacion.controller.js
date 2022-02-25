const catchAsync = require('../utils/catchAsync')
const service = require('../services/response.service')
const daos = require('../daos/bombillos.iluminacion')

const getIluminacion = catchAsync(async (req, res) => {
    let response = { ...service.responseSvc(200) }

    response = await daos.getIluminacion(response)

    res.status(response.valor)
    res.send(service.cleanResponse(response))
})

module.exports = { getIluminacion }
