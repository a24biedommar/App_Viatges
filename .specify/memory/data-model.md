# Data Model: ViatgerPro Vermell

**Project**: ViatgerPro Vermell  
**Created**: 2026-03-17  
**Storage**: IndexedDB (offline-first)

## Visió General

Aquest document defineix l'esquema de la base de dades IndexedDB per a l'aplicació ViatgerPro Vermell. Totes les entitats s'emmagatzemen localment sense dependència d'APIs externes.

## Esquema de Base de Dades

### IndexedDB: ViatgerProDB

```
ViatgerProDB (versió 1)
├── objectStores:
│   ├── usuaris
│   ├── viatges
│   ├── vols
│   ├── allotjaments
│   ├── activitats
│   ├── segmentsTransport
│   ├── menus
│   ├── despeses
│   ├── liquidacions
│   ├── tasquesChecklist
│   ├── documents
│   ├── amics
│   └── invitacions
```

## Entitats

### 1. Usuari

**ObjectStore**: `usuaris`  
**Clau primària**: `id`  
**Índexs**: `correu` (unique)

```javascript
{
  id: "usr_001",
  nom: "Nom de l'usuari",
  correu: "usuari@exemple.com",
  contrasenyaHash: "hash_sha256",
  dataCreat: "2026-03-17T10:00:00Z",
  dataActualitzat: "2026-03-17T10:00:00Z"
}
```

### 2. Viatge

**ObjectStore**: `viatges`  
**Clau primària**: `id`  
**Índexs**: `propietariId`, `dataInici`

```javascript
{
  id: "viatge_001",
  nom: "Viatge a Barcelona",
  descripció: "Cap de setmana a Barcelona",
  dataInici: "2026-04-15",
  dataFi: "2026-04-18",
  propietariId: "usr_001",
  participants: ["usr_001", "usr_002"],
  estat: "actiu", // actiu, complet, cancelat
  dataCreat: "2026-03-17T10:00:00Z",
  dataActualitzat: "2026-03-17T10:00:00Z"
}
```

### 3. Vol

**ObjectStore**: `vols`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `dataSortida`

```javascript
{
  id: "vol_001",
  viatgeId: "viatge_001",
  companyia: "Vueling",
  numeroVol: "VY1234",
  origen: "BCN",
  desti: "MAD",
  horaSortida: "2026-04-15T08:30:00Z",
  horaArriba: "2026-04-15T10:45:00Z",
  preu: 89.50,
  moneda: "EUR",
  terminal: "1",
  porta: "B12",
  notes: "Equipatge de mà només",
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 4. Allotjament

**ObjectStore**: `allotjaments`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `dataEntrada`

```javascript
{
  id: "allotjament_001",
  viatgeId: "viatge_001",
  nom: "Hotel Catalonia",
  adreça: "Carrer de Pelayo, 10",
  ciutat: "Barcelona",
  pais: "Espanya",
  latitud: 41.3818,
  longitud: 2.1745,
  dataEntrada: "2026-04-15",
  horaEntrada: "15:00",
  dataSortida: "2026-04-18",
  horaSortida: "11:00",
  preu: 350.00,
  moneda: "EUR",
  tipus: "hotel", // hotel, apartament, hostal, altres
  habitacio: "Doble",
  reservaNumero: "RES123456",
  contacteTelefon: "+34 932 123 456",
  notes: "Esmorzar inclòs",
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 5. Activitat

**ObjectStore**: `activitats`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `dataHora`

```javascript
{
  id: "activitat_001",
  viatgeId: "viatge_001",
  nom: "Visita a la Sagrada Família",
  descripció: "Tour guiats per la basílica",
  ubicació: "Carrer de Mallorca, 401",
  latitud: 41.4036,
  longitud: 2.1744,
  dataHora: "2026-04-15T17:00:00Z",
  duracio: 120, // minuts
  preu: 30.00,
  moneda: "EUR",
  reservaNumero: "SF12345",
  responsableId: "usr_001",
  estat: "pendent", // pendent, confirmat, cancelat
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 6. SegmentTransport

**ObjectStore**: `segmentsTransport`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `ordretimeline`

```javascript
{
  id: "transport_001",
  viatgeId: "viatge_001",
  puntOrigen: "Aeroport BCN T1",
  puntOrigenLat: 41.2974,
  puntOrigenLng: 2.0833,
  puntDesti: "Hotel Catalonia",
  puntDestiLat: 41.3818,
  puntDestiLng: 2.1745,
  metodeTransport: "metro", // bus, metro, caminan, patinet, bici
  linia: "L9 Sud",
  horaInici: "2026-04-15T11:00:00Z",
  horaFi: "2026-04-15T11:45:00Z",
  preu: 5.15,
  moneda: "EUR",
  ordreTimeline: 1,
  notes: "Prendre L9 fins a Universitat",
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 7. Menu

**ObjectStore**: `menus`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `data`, `tipus`

```javascript
{
  id: "menu_001",
  viatgeId: "viatge_001",
  data: "2026-04-15",
  tipus: "dinar", // dinar, sopar
  plats: [
    "Entrant: Amanida CESAR",
    "Primer: Paella Valenciana",
    "Postres: Tiramisú"
  ],
  restaurant: "Restaurant La Pepa",
  adreça: "Carrer de la Mercè, 15",
  reservaNumero: "RES789",
  hora: "14:00",
  preu: 45.00,
  moneda: "EUR",
  participants: ["usr_001", "usr_002"],
  notes: "Demana taula per a 2",
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 8. Despesa

**ObjectStore**: `despeses`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `data`

```javascript
{
  id: "despesa_001",
  viatgeId: "viatge_001",
  concepte: "Sopar restaurant",
  import: 85.00,
  moneda: "EUR",
  pagadorId: "usr_001",
  participants: ["usr_001", "usr_002"],
  repartiment: {
    "usr_001": 42.50,
    "usr_002": 42.50
  },
  categoria: "menjar", // transport, allotjament, menjar, activitat, altres
  data: "2026-04-15T21:00:00Z",
  metodePagament: "efectiu", // efectiu, tarjeta, bizum
  rebutImatge: "base64...", // opcional
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 9. Liquidacio

**ObjectStore**: `liquidacions`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `deutorId`

```javascript
{
  id: "liquidacio_001",
  viatgeId: "viatge_001",
  deutorId: "usr_002",
  creditorId: "usr_001",
  import: 125.75,
  moneda: "EUR",
  concepte: "Liquidació despeses viatge",
  estat: "pendent", // pendent, satisfet
  dataCreat: "2026-03-17T10:00:00Z",
  dataSatisfet: null
}
```

### 10. TascaChecklist

**ObjectStore**: `tasquesChecklist`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `responsableId`

```javascript
{
  id: "tasca_001",
  viatgeId: "viatge_001",
  nom: "Passaport",
  categoria: "document", // document, roba, accessoris, electronica
  responsableId: "usr_001",
  estat: "pendent", // pendent, completat
  prioritat: "alta", // baixa, mitjana, alta
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 11. Document

**ObjectStore**: `documents`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `tipus`

```javascript
{
  id: "document_001",
  viatgeId: "viatge_001",
  nom: "Bitllets_avio.pdf",
  tipus: "application/pdf",
  categoria: "transport", // transport, allotjament, asseguranca, document, altres
  contingutBase64: "JVBERi0xLjQK...",
  midaBytes: 245678,
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 12. Amic

**ObjectStore**: `amics`  
**Clau primària**: `id`  
**Índexs**: `usuariId`, `amicId`

```javascript
{
  id: "amic_001",
  usuariId: "usr_001",
  amicId: "usr_002",
  nomAmic: "Maria Garcia",
  correuAmic: "maria@exemple.com",
  estat: "acceptat", // pendent, acceptat, rebutjat
  dataCreat: "2026-03-17T10:00:00Z"
}
```

### 13. Invitacio

**ObjectStore**: `invitacions`  
**Clau primària**: `id`  
**Índexs**: `viatgeId`, `invitatId`, `estat`

```javascript
{
  id: "invitacio_001",
  viatgeId: "viatge_001",
  propietariId: "usr_001",
  invitatId: "usr_002",
  token: "inv_token_abc123",
  estat: "pendent", // pendent, acceptada, rebutjada, expirada
  dataCreat: "2026-03-17T10:00:00Z",
  dataExpiracio: "2026-04-14T23:59:59Z"
}
```

## Relacions entre Entitats

```
Usuari (1) ─────< (N) Viatge
Viatge (1) ─────< (N) Vol
Viatge (1) ─────< (N) Allotjament
Viatge (1) ─────< (N) Activitat
Viatge (1) ─────< (N) SegmentTransport
Viatge (1) ─────< (N) Menu
Viatge (1) ─────< (N) Despesa
Viatge (1) ─────< (N) Liquidacio
Viatge (1) ─────< (N) TascaChecklist
Viatge (1) ─────< (N) Document
Usuari (1) ─────< (N) Amic
Viatge (1) ─────< (N) Invitacio
```

## Índexs per a Consultes Eficients

| ObjectStore | Índex | Ús |
|-------------|-------|-----|
| usuaris | correu | Login per correu electrònic |
| viatges | propietariId | Llistar viatges de l'usuari |
| vols | viatgeId, dataSortida | Timeline de vols |
| allotjaments | viatgeId, dataEntrada | Timeline d'allotjaments |
| activitats | viatgeId, dataHora | Timeline d'activitats |
| despeses | viatgeId, data | Historial de despeses |
| liquidacions | viatgeId, estat | Liquidacions pendents |
| amics | usuariId, estat | Llistat d'amics |
| invitacions | viatgeId, estat | Invitacions pendents |

## Notes d'Implementació

- Totes les dates emmagatzemades en format ISO 8601
- Identificadors útils format `tipus_xxx` (vol_001, viatge_001)
- Documents emmagatzemats en Base64 amb límit de 5MB per document
- Transaccions atòmiques per a operacions de liquidació
- Sincronització només quan hi hagi connexió (estat online)
