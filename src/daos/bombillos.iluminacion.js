const service = require('../services/response.service')

/**
 * 
 * @param {*} response 
 * @returns respuseta completa de la petición
 */
const getIluminacion = async (response) => {
    let fs = require('fs')
    let details = []

    try {
        let matriz = fs.readFileSync('matriz.txt', 'utf-8')
        if( matriz !== undefined && matriz !== null && matriz?.length > 0) {
            matriz = matriz.split('\n')
            let matrizAux = matriz.toString().replace(/,/g,'').split('\r')
            if(matrizAux.length > 1) {
                matriz = matrizAux
            }
            response.resultado = await getBombilloOptimo(matriz)
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

/**
 * 
 * @param {matriz que de la habitación que se va a iluminar} matriz 
 * @returns retorna la matriz con los bombillos puestos y la habitación iluminada
 */
const getBombilloOptimo = async (matriz) => {
    let fila = 0
    let columna = 0
    let maxConteo = 0
    for(let filaAux = 0; filaAux < matriz.length; filaAux ++) {
        for(let columnaAux = 0; columnaAux < matriz[filaAux].length; columnaAux ++) {
            if(matriz[filaAux][columnaAux] === '0') {
                let conteo = 0
                conteo += await getBombillosFila(matriz, filaAux, columnaAux)
                conteo += await getBombillosColumna(matriz, filaAux, columnaAux) - 1
                if(conteo > maxConteo) {
                    maxConteo = conteo
                    fila = filaAux
                    columna = columnaAux
                }
            }
        }
    }
    
    if( maxConteo > 0) {
        matriz = [...await setBombillosIluminados(matriz, fila, columna)]
        matriz = [...await getBombilloOptimo(matriz)]
    }
    return matriz
}

/**
 * 
 * @param {matriz} matriz 
 * @param {posición de la fila} fila 
 * @param {posición de la columna} columna 
 * @returns la cantidad de espacios que ilumina el bombillo en una fila
 * en la posición de los parametros fila y columna
 */
const getBombillosFila = async (matriz, fila, columna) => {
    let conteoBombillos = 0
    if(columna === 0) {
        for(let i = 0; i < matriz[fila].length; i ++) {
            if(matriz[fila][i] === '1') {
                i = matriz[fila].length
            }
            else if(matriz[fila][i] === '0') {
                conteoBombillos += 1
            }
        }
    } else {
        for(let i = columna; i < matriz[fila].length; i ++) {
            if(matriz[fila][i] === '1') {
                i = matriz[fila].length
            }
            else if(matriz[fila][i] === '0') {
                conteoBombillos += 1
            }
        }
        for(let i = columna; i > -1; i --) {
            if(matriz[fila][i] === '1') {
                i = -1
            }
            else if(matriz[fila][i] === '0') {
                conteoBombillos += 1
            }
        }
        conteoBombillos -= 1;
    }
    return conteoBombillos
}

/**
 * 
 * @param {matriz} matriz 
 * @param {posición de la fila} fila 
 * @param {posición de la columna} columna 
 * @returns la cantidad de espacios que ilumina el bombillo en una columna
 * en la posición de los parametros fila y columna
 */
const getBombillosColumna = async (matriz, fila, columna) => {
    let conteoBombillos = 0
    if(fila === 0) {
        for(let i = 0; i < matriz.length; i ++) {
            if(matriz[i][columna] === '1') {
                i = matriz.length
            }
            else if(matriz[i][columna] === '0') {
                conteoBombillos += 1
            }
        }
    } else {
        for(let i = fila; i < matriz.length; i ++) {

            if(matriz[i][columna] === '1') {
                i = matriz.length
            }
            else if(matriz[i][columna] === '0') {
                conteoBombillos += 1
            }
        }
        for(let i = fila; i > -1; i --) {
            if(matriz[i][columna] === '1') {
                i = -1
            }
            else if(matriz[i][columna] === '0') {
                conteoBombillos += 1
            }
        }
        conteoBombillos -= 1;
    }
    return conteoBombillos
}

/**
 * 
 * @param {matriz de habitación} matriz 
 * @param {posición de la fila} fila 
 * @param {posición de la columna} columna 
 * @returns la matriz con el pasillo iluminado según la posición enviada
 */
const setBombillosIluminados = async (matriz, fila, columna) => {
    let matrizAux = [ ...matriz ]
    
    if(columna === 0) {
        for(let i = 0; i < matriz[fila].length; i ++) {
            if(matriz[fila][i] === '1') {
                i = matriz[fila].length
            }
            else if(matriz[fila][i] === '0') {
                let aux = matrizAux[fila].split('')
                aux[i] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[fila] = aux
            }
        }
    } else {
        for(let i = columna; i < matriz[fila].length; i ++) {
            if(matriz[fila][i] === '1') {
                i = matriz[fila].length
            }
            else if(matriz[fila][i] === '0') {
                let aux = matrizAux[fila].split('')
                aux[i] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[fila] = aux
            }
        }
        for(let i = columna; i > -1; i --) {
            if(matriz[fila][i] === '1') {
                i = -1
            }
            else if(matriz[fila][i] === '0') {
                let aux = matrizAux[fila].split('')
                aux[i] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[fila] = aux
            }
        }
    }
    if(fila === 0) {
        for(let i = 0; i < matriz.length; i ++) {
            if(matriz[i][columna] === '1') {
                i = matriz.length
            }
            else if(matriz[i][columna] === '0') {
                let aux = matrizAux[i].split('')
                aux[columna] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[i] = aux
            }
        }
    } else {
        for(let i = fila; i < matriz.length; i ++) {

            if(matriz[i][columna] === '1') {
                i = matriz.length
            }
            else if(matriz[i][columna] === '0') {
                let aux = matrizAux[i].split('')
                aux[columna] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[i] = aux
            }
        }
        for(let i = fila; i > -1; i --) {
            if(matriz[i][columna] === '1') {
                i = -1
            }
            else if(matriz[i][columna] === '0') {
                let aux = matrizAux[i].split('')
                aux[columna] = '2'
                aux = aux.toString()
                aux = aux.replace(/,/g,'')
                matrizAux[i] = aux
            }
        }
    }
    let aux = matrizAux[fila].split('')
    aux[columna] = '3'
    aux = aux.toString()
    aux = aux.replace(/,/g,'')
    matrizAux[fila] = aux

    return matrizAux
}

exports.getIluminacion = getIluminacion