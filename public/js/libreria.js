/** desarrollado por:

/*
*
*
* Materia:
* Institución: Escuela Militar de Ingeniería
* fecha: mayo 2022
* version: 0.4;
*/

/* Valores Unicos Extrae los valores unicos por el nombre de la columna*/
function valoresUnicos(data, columna) {
    return [...new Set(data.map(item => item[columna]))];
}

/*valores filtrados por nombre de la columna y pasar el parametro en dato */
function filtroPorColumna(data, columna, dato) {
    return data.filter(x => x[columna] == dato);
}

/**function que agrupa y acumula por nombre de columna y columna estadistica */
function agrupaAcumula(data, columnaAgrupa, columnaAcumula) {
    return data.reduce((p, c) => {
        (c[columnaAgrupa] in p) ? p[c[columnaAgrupa]] += parseFloat(c[columnaAcumula]): p[c[columnaAgrupa]] = parseFloat(c[columnaAcumula]);
        return p;
    }, {});
}

function separarObjeto(obj) {
    var uno = [];
    var dos = [];

    Object.keys(obj).map(function(idx) {
        uno.push(idx);
        dos.push(obj[idx])
    });
    return [uno, dos];
};

function devuelveObjpie(obj) {
    var datos = [];
    Object.keys(obj).map(function(idx) {
        datos.push({ "value": obj[idx], "name": idx });
    });
    return datos;
}

function arrayify(coleccion) {
    return Array.prototype.slice.call(coleccion);
}

function factory(heading) {
    return function(row) {
        return arrayify(row.cells).reduce(function(prev, curr, i) {
            prev[heading[i]] = (curr.innerText).trim();
            return prev;
        }, {});
    }
}

function generaMultiple(c, columnaDos, vector) {
    var datos = [];
    var sep = [];
    var leyen = [];
    vector.map(x => {
        var objeGet = {};
        var prueba = agrupaAcumula(c, columnaDos, x)
        sep = separarObjeto(prueba);
        objeGet.name = x;
        objeGet.type = "bar";
        objeGet.data = sep[1];
        datos.push(objeGet)
        leyen.push(x)
    })
    return [sep[0], datos, leyen];
}