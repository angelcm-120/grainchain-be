const catchAsync = require('../utils/catchAsync'); 
const service = require('../services/response.service'); 

const getStatus = catchAsync(async (req, res) => {
  let response =  { ...service.responseSvc(200) }
  response.codigo=undefined
  response.info=undefined
  res.status(response.valor);   
  res.send(service.cleanResponse(response)); 
});

module.exports = { getStatus };
