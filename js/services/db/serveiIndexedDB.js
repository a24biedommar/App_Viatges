import { openDB } from 'idb';

const nomBaseDades = 'ViatgerProDB';
const versioBaseDades = 1;

function obrirBaseDades() {
    return openDB(nomBaseDades, versioBaseDades, {
        upgrade(db) {
            inicialitzarEsquema(db);
        }
    });
}

function inicialitzarEsquema(database) {
    if (!database.objectStoreNames.contains('usuaris')) {
        var storeUsuaris = database.createObjectStore('usuaris', { keyPath: 'id' });
        storeUsuaris.createIndex('correu', 'correu', { unique: true });
    }

    if (!database.objectStoreNames.contains('viatges')) {
        var storeViatges = database.createObjectStore('viatges', { keyPath: 'id' });
        storeViatges.createIndex('propietariId', 'propietariId', { unique: false });
        storeViatges.createIndex('dataInici', 'dataInici', { unique: false });
    }

    if (!database.objectStoreNames.contains('vols')) {
        var storeVols = database.createObjectStore('vols', { keyPath: 'id' });
        storeVols.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeVols.createIndex('dataSortida', 'dataSortida', { unique: false });
    }

    if (!database.objectStoreNames.contains('allotjaments')) {
        var storeAllotjaments = database.createObjectStore('allotjaments', { keyPath: 'id' });
        storeAllotjaments.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeAllotjaments.createIndex('dataEntrada', 'dataEntrada', { unique: false });
    }

    if (!database.objectStoreNames.contains('activitats')) {
        var storeActivitats = database.createObjectStore('activitats', { keyPath: 'id' });
        storeActivitats.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeActivitats.createIndex('dataHora', 'dataHora', { unique: false });
    }

    if (!database.objectStoreNames.contains('segmentsTransport')) {
        var storeTransport = database.createObjectStore('segmentsTransport', { keyPath: 'id' });
        storeTransport.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeTransport.createIndex('ordreTimeline', 'ordreTimeline', { unique: false });
    }

    if (!database.objectStoreNames.contains('menus')) {
        var storeMenus = database.createObjectStore('menus', { keyPath: 'id' });
        storeMenus.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeMenus.createIndex('data', 'data', { unique: false });
    }

    if (!database.objectStoreNames.contains('despeses')) {
        var storeDespeses = database.createObjectStore('despeses', { keyPath: 'id' });
        storeDespeses.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeDespeses.createIndex('data', 'data', { unique: false });
    }

    if (!database.objectStoreNames.contains('liquidacions')) {
        var storeLiquidacions = database.createObjectStore('liquidacions', { keyPath: 'id' });
        storeLiquidacions.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeLiquidacions.createIndex('estat', 'estat', { unique: false });
    }

    if (!database.objectStoreNames.contains('tasquesChecklist')) {
        var storeChecklist = database.createObjectStore('tasquesChecklist', { keyPath: 'id' });
        storeChecklist.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeChecklist.createIndex('responsableId', 'responsableId', { unique: false });
    }

    if (!database.objectStoreNames.contains('documents')) {
        var storeDocuments = database.createObjectStore('documents', { keyPath: 'id' });
        storeDocuments.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeDocuments.createIndex('tipus', 'tipus', { unique: false });
    }

    if (!database.objectStoreNames.contains('amics')) {
        var storeAmics = database.createObjectStore('amics', { keyPath: 'id' });
        storeAmics.createIndex('usuariId', 'usuariId', { unique: false });
        storeAmics.createIndex('estat', 'estat', { unique: false });
    }

    if (!database.objectStoreNames.contains('invitacions')) {
        var storeInvitacions = database.createObjectStore('invitacions', { keyPath: 'id' });
        storeInvitacions.createIndex('viatgeId', 'viatgeId', { unique: false });
        storeInvitacions.createIndex('estat', 'estat', { unique: false });
    }
}

async function desar(nomStore, dada) {
    const db = await obrirBaseDades();
    return db.put(nomStore, dada);
}

async function obtenirTots(nomStore) {
    const db = await obrirBaseDades();
    return db.getAll(nomStore);
}

async function obtenirPerClau(nomStore, clau) {
    const db = await obrirBaseDades();
    return db.get(nomStore, clau);
}

async function eliminar(nomStore, clau) {
    const db = await obrirBaseDades();
    return db.delete(nomStore, clau);
}

async function obtenirPerIndex(nomStore, nomIndex, valor) {
    const db = await obrirBaseDades();
    const tx = db.transaction(nomStore, 'readonly');
    const store = tx.objectStore(nomStore);
    const index = store.index(nomIndex);
    return index.getAll(valor);
}

export {
    obrirBaseDades,
    desar,
    obtenirTots,
    obtenirPerClau,
    obtenirPerIndex,
    eliminar,
    inicialitzarEsquema
};
