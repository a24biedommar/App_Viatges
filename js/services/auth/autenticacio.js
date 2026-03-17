import { obtenirTots, obtenirPerIndex, desar } from '../db/serveiIndexedDB.js';

const USUARI_ACTUAL_CLAU = 'usuariActual';

async function registrarUsuari(nom, correu, contrasenya) {
    if (!nom || !correu || !contrasenya) {
        throw new Error('El nom, correu i contrasenya són obligatoris');
    }

    const usuarisExistents = await obtenirTots('usuaris');

    const trobat = usuarisExistents.some(u => u.correu === correu);
    if (trobat) {
        throw new Error('Ja existeix un usuari amb aquest correu');
    }

    const hashContrasenya = hashSimple(contrasenya);
    const idUsuari = generarIdUsuari();

    const nouUsuari = {
        id: idUsuari,
        nom: nom,
        correu: correu,
        contrasenyaHash: hashContrasenya,
        dataCreat: new Date().toISOString(),
        dataActualitzat: new Date().toISOString()
    };

    await desar('usuaris', nouUsuari);

    return {
        id: nouUsuari.id,
        nom: nouUsuari.nom,
        correu: nouUsuari.correu,
        dataCreat: nouUsuari.dataCreat
    };
}

async function iniciarSessio(correu, contrasenya) {
    if (!correu || !contrasenya) {
        throw new Error('El correu i la contrasenya són obligatoris');
    }

    const usuaris = await obtenirPerIndex('usuaris', 'correu', correu);

    if (!usuaris || usuaris.length === 0) {
        throw new Error('Usuari o contrasenya incorrectes');
    }

    const usuari = usuaris[0];

    const hash = hashSimple(contrasenya);
    if (hash !== usuari.contrasenyaHash) {
        throw new Error('Usuari o contrasenya incorrectes');
    }

    const usuariSenseContrasenya = {
        id: usuari.id,
        nom: usuari.nom,
        correu: usuari.correu,
        dataCreat: usuari.dataCreat
    };

    sessionStorage.setItem(USUARI_ACTUAL_CLAU, JSON.stringify(usuariSenseContrasenya));

    return usuariSenseContrasenya;
}

function tancarSessio() {
    sessionStorage.removeItem(USUARI_ACTUAL_CLAU);
    return Promise.resolve(true);
}

function obtenirUsuariActual() {
    return new Promise(function(resolve) {
        var usuariJson = sessionStorage.getItem(USUARI_ACTUAL_CLAU);

        if (!usuariJson) {
            resolve(null);
            return;
        }

        var usuari = JSON.parse(usuariJson);
        resolve(usuari);
    });
}

async function estaAutenticat() {
    const usuari = await obtenirUsuariActual();
    return usuari !== null;
}

function hashSimple(contrasenya) {
    var str = String(contrasenya);
    var hash = 0;
    var i = 0;

    while (i < str.length) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
        i = i + 1;
    }

    return 'hash_' + Math.abs(hash).toString(16);
}

function generarIdUsuari() {
    var timestamp = Date.now().toString(36);
    var random = Math.random().toString(36).substring(2, 8);
    return 'usr_' + timestamp + random;
}

export {
    registrarUsuari,
    iniciarSessio,
    tancarSessio,
    obtenirUsuariActual,
    estaAutenticat
};
