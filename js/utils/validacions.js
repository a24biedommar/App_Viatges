/*================================================
=                 IMPORTS                          =
================================================*/

/*================================================
=                 VARIABLES                       =
================================================*/

/*================================================
=                 FUNCIONS                       =
================================================*/

/**
 * Funció per generar un ID únic
 * A. Pas 1: Obtenir el timestamp actual
 * B. Pas 2: Generar un número aleatori
 * C. Pas 3: Combinar per crear l'ID
 * D. Pas 4: Afegir el prefix
 */
function generarId(prefix) {
    // A. Pas 1: Timestamp
    var timestamp = Date.now().toString(36);

    // B. Pas 2: Número aleatori
    var random = Math.random().toString(36).substring(2, 10);

    // C. Pas 3: Combinar
    var id = timestamp + random;

    // D. Pas 4: Afegir prefix
    if (prefix) {
        id = prefix + '_' + id;
    }

    return id;
}

/**
 * Funció per validar un correu electrònic
 * A. Pas 1: Comprovar que el correu no estigui buit
 * B. Pas 2: Comprovar el format mitjançant expressió regular
 * C. Pas 3: Retornar true si és vàlid
 */
function validarCorreu(correu) {
    // A. Pas 1: Comprovar que no estigui buit
    if (!correu || correu.trim() === '') {
        return false;
    }

    // B. Pas 2: Expressió regular per validar correu
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var esValid = patron.test(correu);

    // C. Pas 3: Retornar
    return esValid;
}

/**
 * Funció per validar una contrasenya
 * A. Pas 1: Comprovar que la contrasenya tingui almenys 6 caràcters
 * B. Pas 2: Retornar true si és vàlida
 */
function validarContrasenya(contrasenya) {
    // A. Pas 1: Longitud mínima
    if (!contrasenya || contrasenya.length < 6) {
        return false;
    }

    // B. Pas 2: Retornar
    return true;
}

/**
 * Funció per formatar una data a ISO
 * A. Pas 1: Crear l'objecte Date
 * B. Pas 2: Retornar en format ISO
 */
function formatarDataISO(data) {
    // A. Pas 1: Objecte Date
    var dataObj = new Date(data);

    // B. Pas 2: Format ISO
    return dataObj.toISOString();
}

/**
 * Funció per formatar una data per a mostrar
 * A. Pas 1: Crear l'objecte Date
 * B. Pas 2: Obtenir els components
 * C. Pas 3: Formatar com a dd/mm/aaaa
 */
function formatarDataVisible(data) {
    // A. Pas 1: Objecte Date
    var dataObj = new Date(data);

    // B. Pas 2: Components
    var dia = dataObj.getDate();
    var mes = dataObj.getMonth() + 1;
    var any = dataObj.getFullYear();

    // C. Pas 3: Format
    var diaStr = dia < 10 ? '0' + dia : dia;
    var mesStr = mes < 10 ? '0' + mes : mes;

    return diaStr + '/' + mesStr + '/' + any;
}

/**
 * Funció per formatar una hora
 * A. Pas 1: Crear l'objecte Date
 * B. Pas 2: Obtenir hores i minuts
 * C. Pas 3: Formatar com a hh:mm
 */
function formatarHora(data) {
    // A. Pas 1: Objecte Date
    var dataObj = new Date(data);

    // B. Pas 2: Components
    var hores = dataObj.getHours();
    var minuts = dataObj.getMinutes();

    // C. Pas 3: Format
    var horesStr = hores < 10 ? '0' + hores : hores;
    var minutsStr = minuts < 10 ? '0' + minuts : minuts;

    return horesStr + ':' + minutsStr;
}

/**
 * Funció per calcular els dies entre dues dates
 * A. Pas 1: Convertir les dates a objectes Date
 * B. Pas 2: Calcular la diferència en milisegons
 * C. Pas 3: Convertir a dies
 */
function diesEntreDates(dataInici, dataFi) {
    // A. Pas 1: Objectes Date
    var inici = new Date(dataInici);
    var fi = new Date(dataFi);

    // B. Pas 2: Diferència en ms
    var diffMs = fi - inici;

    // C. Pas 3: Convertir a dies
    var diffDies = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDies;
}

/**
 * Funció per codificar un fitxer a Base64
 * A. Pas 1: Llegir el fitxer com a ArrayBuffer
 * B. Pas 2: Convertir a string binària
 * C. Pas 3: Codificar a Base64
 */
function fitxerToBase64(fitxer) {
    return new Promise(function(resolve, reject) {
        try {
            var reader = new FileReader();

            reader.onload = function(event) {
                resolve(event.target.result);
            };

            reader.onerror = function() {
                reject(new Error('Error en llegir el fitxer'));
            };

            reader.readAsDataURL(fitxer);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Funció per descodificar Base64 a fitxer
 * A. Pas 1: Extreure les dades Base64 del data URL
 * B. Pas 2: Convertir a array de bytes
 * C. Pas 3: Crear el blob
 */
function base64ToFitxer(base64, nom, tipus) {
    // A. Pas 1: Extreure dades
    var dadesBase64 = base64.split(',')[1];

    // B. Pas 2: Decode
    var bytes = atob(dadesBase64);
    var array = new Uint8Array(bytes.length);
    var i = 0;

    while (i < bytes.length) {
        array[i] = bytes.charCodeAt(i);
        i = i + 1;
    }

    // C. Pas 3: Blob
    var blob = new Blob([array], { type: tipus });

    return blob;
}

/**
 * Funció per verificar si l'aplicació està online
 * A. Pas 1: Comprovar la propietat navigator.onLine
 * B. Pas 2: Retornar l'estat
 */
function estaOnline() {
    if (typeof navigator !== 'undefined') {
        return navigator.onLine;
    }
    return false;
}

/**
 * Funció per obtenir la data actual en format ISO
 * A. Pas 1: Obtenir la data actual
 * B. Pas 2: Retornar en format ISO
 */
function obtenirDataActual() {
    return new Date().toISOString();
}

/*================================================
=                 EXPORTS                        =
================================================*/

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generarId: generarId,
        validarCorreu: validarCorreu,
        validarContrasenya: validarContrasenya,
        formatarDataISO: formatarDataISO,
        formatarDataVisible: formatarDataVisible,
        formatarHora: formatarHora,
        diesEntreDates: diesEntreDates,
        fitxerToBase64: fitxerToBase64,
        base64ToFitxer: base64ToFitxer,
        estaOnline: estaOnline,
        obtenirDataActual: obtenirDataActual
    };
}
