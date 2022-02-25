/* eslint-disable camelcase */

const service = process.env.SERVICIO;
const celula =   `${process.env.DIRECCION}-${process.env.CELULA}-${process.env.APLICACION}`;
const codigoAPI =   `${process.env.CODIGOAPI}`;
const msj_codigo200 = `200.GrainChain-Test-msobombillos.000200`;
const msj_codigo400 = `400.GrainChain-Test-msobombillos.000400`;
const msj_codigo401 = `401.GrainChain-Test-msobombillos.000401`;
const msj_codigo403 = `403.GrainChain-Test-msobombillos.000403`;
const msj_codigo404 = `404.GrainChain-Test-msobombillos.000404`;
const msj_codigo405 = `405.GrainChain-Test-msobombillos.000405`;
const msj_codigo422 = `422.GrainChain-Test-msobombillos.000422`;
const msj_codigo500 = `500.GrainChain-Test-msobombillos.000500`;
const msj_codigo501 = `501.GrainChain-Test-msobombillos.000501`;
const msj_codigo201 = `201.GrainChain-Test-msobombillos.000201`;
const msj_info200 = `https://grainchain.test.com/info#.${msj_codigo200}`;
const msj_info201 = `https://grainchain.test.com/info#.${msj_codigo201}`;
const msj_info400 = `https://grainchain.test.com/info#.${msj_codigo400}`;
const msj_info401 = `https://grainchain.test.com/info#.${msj_codigo401}`;
const msj_info403 = `https://grainchain.test.com/info#.${msj_codigo403}`;
const msj_info404 = `https://grainchain.test.com/info#.${msj_codigo404}`;
const msj_info405 = `https://grainchain.test.com/info#.${msj_codigo405}`;
const msj_info422 = `https://grainchain.test.com/info#.${msj_codigo422}`;
const msj_info500 = `https://grainchain.test.com/info#.${msj_codigo500}`;
const msj_info501 = `https://grainchain.test.com/info#.${msj_codigo501}` ;
const msj_codigo200_descripcion = 'Operación exitosa.';
const msj_codigo201_descripcion = 'Solicitud creada de forma exitosa.';
const msj_codigo400_descripcion = 'Solicitud Incorrecta.';
const msj_codigo401_descripcion = 'No autorizado.';
const msj_codigo403_descripcion = 'No es posible realizar esta operación.';
const msj_codigo404_descripcion = 'No encontrado.';
const msj_codigo405_descripcion = 'Método no permitido.';
const msj_codigo422_descripcion = 'Entidad no procesable.';
const msj_codigo500_descripcion = 'Error interno en el servicio.';
const msj_codigo501_descripcion = 'No implementado.';

const httpStatus = {
  status200: {
    value: 200,
    status: 'OK',
    description: msj_codigo200_descripcion,
    info: msj_info200,
    code: msj_codigo200,
  },
  status201: {
    value: 201,
    status: 'CREATED',
    description: msj_codigo201_descripcion,
    info: msj_info201,
    code: msj_codigo201,
  },
  status400: {
    value: 400,
    status: 'BAD_REQUEST',
    description: msj_codigo400_descripcion,
    info: msj_info400,
    code: msj_codigo400,
  },
  status401: {
    value: 401,
    status: 'UNAUTHORIZED',
    description: msj_codigo401_descripcion,
    info: msj_info401,
    code: msj_codigo401,
  },
  status403: {
    value: 403,
    status: 'FORBIDDEN',
    description: msj_codigo403_descripcion,
    info: msj_info403,
    code: msj_codigo403,
  },
  status404: {
    value: 404,
    status: 'NOT_FOUND',
    description: msj_codigo404_descripcion,
    info: msj_info404,
    code: msj_codigo404,
  },
  status405: {
    value: 405,
    status: 'METHOD_NOT_ALLOWED',
    description: msj_codigo405_descripcion,
    info: msj_info405,
    code: msj_codigo405,
  },
  status422: {
    value: 422,
    status: 'UNPROCESSABLE_ENTITY',
    description: msj_codigo422_descripcion,
    info: msj_info422,
    code: msj_codigo422,
  },
  status500: {
    value: 500,
    status: 'INTERNAL_SERVER_ERROR',
    description: msj_codigo500_descripcion,
    info: msj_info500,
    code: msj_codigo500,
  },
  status501: {
    value: 501,
    status: 'NOT_IMPLEMENTED',
    description: msj_codigo501_descripcion,
    info: msj_info501,
    code: msj_codigo501,
  },
  NotImplemented: {
    value: 0,
    status: 'Not Implemented',
    description: msj_codigo501_descripcion,
    info: msj_info501,
    code: msj_codigo501,
  },
};

const dateFormat = require('dateformat');

const folio = () => {
  const day = dateFormat(new Date(), 'yyyyMMddHHmmss');
  return `${day}${day.valueOf()}`;
};

const cleanResponse=(response)=> {
  response.valor=null;
  response.descripcion=null;
  response.httpstatus=null;
  let aux = JSON.stringify(response);    
  let filteredAux = JSON.parse(aux, (key, value) => {if(value !== null) return value});
  return filteredAux
}

const responseSvc = {
  
  codigo: httpStatus.status200.code,
  mensaje: httpStatus.status200.description,
  folio: folio(),
  info: msj_info200,
  detalles:null,
  servicio: null,
  descripcion: null,
  httpstatus: httpStatus.status200.status,  
  excepcion:null,  
  resultado: null,
  valor:null
};

const getResponseSVC = (code) => {
  const response = { ...responseSvc };
  if (code !== undefined) {
    switch (code) {
      case 200:
        response.codigo = httpStatus.status200.code;
        response.httpstatus = httpStatus.status200.status;
        response.descripcion = httpStatus.status200.description;
        response.valor = httpStatus.status200.value;
        response.info= msj_info200;
        response.mensaje= httpStatus.status200.description;
        break;
      case 201:
        response.codigo = httpStatus.status201.code;
        response.httpstatus = httpStatus.status201.status;
        response.descripcion = httpStatus.status201.description;
        response.valor = httpStatus.status201.value;
        response.info= msj_info201;
        response.mensaje= httpStatus.status201.description;
        break;
      case 400:
        response.codigo = httpStatus.status400.code;
        response.httpstatus = httpStatus.status400.status;
        response.descripcion = httpStatus.status400.description;
        response.valor = httpStatus.status400.value;
        response.info= msj_info400;
        response.mensaje= httpStatus.status400.description;
        break;
      case 401:
        response.codigo = httpStatus.status401.code;
        response.httpstatus = httpStatus.status401.status;
        response.descripcion = httpStatus.status401.description;
        response.valor = httpStatus.status401.value;
        response.info= msj_info401;
        response.mensaje= httpStatus.status401.description;
        break;
      case 403:
        response.codigo = httpStatus.status403.code;
        response.httpstatus = httpStatus.status403.status;
        response.descripcion = httpStatus.status403.description;
        response.valor = httpStatus.status403.value;
        response.info= msj_info403;
        response.mensaje= httpStatus.status403.description;
        break;
      case 404:
        response.codigo = httpStatus.status404.code;
        response.httpstatus = httpStatus.status404.status;
        response.descripcion = httpStatus.status404.description;
        response.valor = httpStatus.status404.value;
        response.info= msj_info404;
        response.mensaje= httpStatus.status404.description;
        break;
      case 405:
        response.codigo = httpStatus.status405.code;
        response.httpstatus = httpStatus.status405.status;
        response.descripcion = httpStatus.status405.description;
        response.valor = httpStatus.status405.value;
        response.info= msj_info405;
        response.mensaje= httpStatus.status405.description;
        break;
      case 422:
        response.codigo = httpStatus.status422.code;
        response.httpstatus = httpStatus.status422.status;
        response.descripcion = httpStatus.status422.description;
        response.valor = httpStatus.status422.value;
        response.info= msj_info422;
        response.mensaje= httpStatus.status422.description;
        break;
      case 500:
        response.codigo = httpStatus.status500.code;
        response.httpstatus = httpStatus.status500.status;
        response.descripcion = httpStatus.status500.description;
        response.valor = httpStatus.status500.value;
        response.info= msj_info500;
        response.mensaje= httpStatus.status500.description;
        break;
      case 501:
        response.codigo = httpStatus.status501.code;
        response.httpstatus = httpStatus.status501.status;
        response.descripcion = httpStatus.status501.description;
        response.valor = httpStatus.status501.value;
        response.info= msj_info501;
        response.mensaje= httpStatus.status501.description;
        break;
      default:
        response.codigo = httpStatus.status501.code;
        response.httpstatus = httpStatus.status501.status;
        response.descripcion = httpStatus.status501.description;
        response.valor = httpStatus.status501.value;
        response.info= msj_info501
        response.mensaje= httpStatus.status501.description;

        break;
    }
  }

  return response;
};

exports.service = service;
exports.httpStatus = httpStatus;
exports.responseSvc = getResponseSVC;
exports.cleanResponse= cleanResponse;
