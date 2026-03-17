# Feature Specification: ViatgerPro Vermell

**Feature Branch**: `001-viatgerpro-vermell`  
**Created**: 2026-03-17  
**Status**: Draft  
**Input**: User description: "PWA travel app"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Inici de sessió i mode offline (Priority: P1)

Com a usuari, vull poder iniciar sessió per sincronitzar les meves dades en línia, però también vull poder utilitzar l'aplicació sense connexió a internet utilitzant dades locals emmagatzemades a IndexedDB.

**Why this priority**: Aquest és el fonament de l'aplicació - sense ell, no es pot utilitzar l'app fora de línia ni sincronitzar dades.

**Independent Test**: Es pot provar iniciant sessió, creant un viatge offline, tancant la sessió i verificant que les dades persisteixen localment.

**Acceptance Scenarios**:

1. **Given** L'usuari té compte, **When** inicia sessió amb credencials vàlides, **Then** el sistema sincronitza les dades i mostra la interfície principal
2. **Given** L'usuari no té connexió a internet, **When** obre l'aplicació, **Then** l'aplicació carrega les dades des d'IndexedDB i permet utilitzar les funcionalitats disponibles offline

---

### User Story 2 - Gestió de viatges (Priority: P1)

Com a usuari, vull crear, editar i eliminar viatges amb els seus respectius mòduls per organitzar les meves vacances o desplaçaments.

**Why this priority**: La gestió de viatges és la funcionalitat核核 de l'aplicació.

**Independent Test**: Es pot provar creant un viatge, afegint-hi vol, allotjament, activitats i verificant que tot es mostra correctament.

**Acceptance Scenarios**:

1. **Given** L'usuari està a la pantalla principal, **When** crea un nou viatge amb nom i dates, **Then** el sistema crea el viatge i mostra els 5 mòduls disponibles
2. **Given** L'usuari té un viatge creat, **When** elimina el viatge, **Then** el sistema elimina totes les dades associades i actualitza la vista

---

### User Story 3 - Mòdul de Logística (Priority: P1)

Com a usuari, vull gestionar els vols i allotjaments del meu viatge amb els seus preus, hores i ubicacions per tenir una visió completa del meu itinerari.

**Why this priority**: La logística és essencial per a qualsevol viatge i permet organitzar els desplaçaments.

**Independent Test**: Es pot provar afegint un vol amb origen, destí, hora i preu, i verificant que apareix correctament ordenat.

**Acceptance Scenarios**:

1. **Given** L'usuari està dins d'un viatge, **When** afegeix un vol amb tots els detalls, **Then** el sistema desa el vol i el mostra a la llista
2. **Given** L'usuari té vols creats, **When** consulta la llista, **Then** els vols es mostren ordenats cronològicament

---

### User Story 4 - Itinerari Intel·ligent amb Transport Connectiu (Priority: P1)

Com a usuari, vull veure el meu itinerari en una vista de timeline estil Google Calendar i poder afegir segments de transport entre punts que incloguin un botó per obrir Google Maps.

**Why this priority**: Permet visualitzar totes les activitats de forma clara i navegar fàcilment entre ubicacions.

**Independent Test**: Es pot provar creant activitats, afegint un segment de transport, i verificant que el botó de Google Maps obre l'aplicació amb la ruta.

**Acceptance Scenarios**:

1. **Given** L'usuari està al mòdul Itinerari, **When** afegeix una activitat, **Then** l'activitat apareix al timeline
2. **Given** L'usuari afegeix un segment de transport, **When** selecciona mètode i punts, **Then** el sistema crea el connector i mostra el botó per obrir Google Maps

---

### User Story 5 - Planificació de Menús (Priority: P2)

Com a usuari, vull planificar els meus menjars diaris (dinar i sopar) durant el viatge per organitzar les menjades.

**Why this priority**: Funcionalitat important per a la planificació però no crítica per al funcionament del viatge.

**Independent Test**: Es pot provar creant un menú per a un dia específic i verificant que apareix a la planificació.

**Acceptance Scenarios**:

1. **Given** L'usuari està al mòdul Menús, **When** crea un menú per dinar, **Then** el sistema desa el menú i l'associa al dia
2. **Given** L'usuari té menús creats, **When** consulta els dies del viatge, **Then** es mostren tots els menús ordenats per dia

---

### User Story 6 - Finances i Split de despeses (Priority: P1)

Com a usuari, vull registrar despeses amb múltiples pagadors i liquidar els deutes entre els participants del viatge.

**Why this priority**: Funcionalitat essencial per a viatges grupals on cal splits de despeses.

**Independent Test**: Es pot provar registrant una despesa amb dos participants, verificant el càlcul de deutes.

**Acceptance Scenarios**:

1. **Given** L'usuari registra una despesa de 100€ pagada per l'usuari A, **When** divideix entre 2 participants, **Then** cada participant deu 50€
2. **Given** Hi ha deutes pendents, **When** l'usuari demana liquidació, **Then** el sistema mostra el resum de qui ha de pagar a qui

---

### User Story 7 - Eines: Checklist, Documents i Conversor (Priority: P2)

Com a usuari, vull disposar d'una checklist de maletes amb responsables, emmagatzemar documents en Base64 i convertir monedes manualment.

**Why this priority**: Eines útils però no crítiques per al funcionament del viatge.

**Independent Test**: Es pot provar creant una tasca a la checklist, pujant un document i consultant el conversor.

**Acceptance Scenarios**:

1. **Given** L'usuari crea una tasca a la checklist, **When** assigna un responsable, **Then** la tasca apareix a la llista
2. **Given** L'usuari puja un document, **When** el sistema rep el fitxer, **Then** el desa codificat en Base64

---

### User Story 8 - Sistema Social: Amics i Invitacions (Priority: P2)

Com a usuari, vull gestionar una llista d'amics i convidar participants als meus viatges via enllaç o sol·licitud directa.

**Why this priority**: Permet la col·laboració en viatges amb altres usuaris.

**Independent Test**: Es pot provar enviant una invitació i acceptant-la des d'un altre compte.

**Acceptance Scenarios**:

1. **Given** L'usuari envia una invitació, **When** el receptor l'accepta, **Then** ambdós usuaris es mostren a les seves llistes d'amics
2. **Given** L'usuari crea un enllaç d'invitació, **When** algú l'utilitza, **Then** la sol·licitud apareix al propietari del viatge

---

### Edge Cases

- Què passa quan l'usuari intenta sincronitzar dades sense connexió i no hi ha dades locals?
- Com es gestionen els conflictes quan dues persones.editen el mateix viatge offline?
- Què passa quan el token d'autenticació expira durant una sessió offline?
- Com es limita la mida dels documents emmagatzemats en Base64?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE permetre a l'usuari iniciar sessió amb credencials vàlides
- **FR-002**: El sistema DEBE emmagatzemar totes les dades a IndexedDB per al mode offline
- **FR-003**: Els usuaris DEBEN poder crear, editar i eliminar viatges
- **FR-004**: El sistema DEBE mostrar 5 mòduls dins de cada viatge: Logística, Itinerari, Menús, Finances, Eines
- **FR-005**: El mòdul de logística DEBE permetre gestionar vols amb preu, hora i ubicació
- **FR-006**: El mòdul de logística DEBE permetre gestionar allotjaments amb preu, horari i adreça
- **FR-007**: El mòdul Itinerari DEBE mostrar una vista de timeline estil Google Calendar
- **FR-008**: El sistema DEBE permetre afegir segments de transport connectiu entre dos punts
- **FR-009**: Els segments de transport DEBEN incloure un botó per obrir Google Maps amb ruta preconfigurada
- **FR-010**: El sistema DEBE permet triar mètode de transport: Bus, Metro/Línia, Caminant, Patinet, Bici
- **FR-011**: El mòdul Menús DEBE permetre planificar dinars i sopars per a cada dia
- **FR-012**: El sistema DEBE permetre registrar despeses amb múltiples pagadors
- **FR-013**: El sistema DEBE calcular i liquidar deutes entre participants automàticament
- **FR-014**: El mòdul Eines DEBE permetre crear checklists de maletes amb responsables
- **FR-015**: El sistema DEBE permetre emmagatzemar documents en format Base64
- **FR-016**: El mòdul Eines DEBE incloure un conversor de moneda manual
- **FR-017**: L'aplicació DEBE mostrar 4 seccions al footer: Explorar, Amics, Notificacions, Perfil
- **FR-018**: La secció Perfil DEBE mostrar el text específic de l'aplicació
- **FR-019**: El sistema DEBE permetre gestionar una llista d'amics
- **FR-020**: El sistema DEBE permetre convidar participants via enllaç o sol·licitud directa

### Key Entities

- **Usuari**: Identificador, nom, correu electrònic, contrasenya hashada
- **Viatge**: Identificador, nom, dates d'inici i fi, propietari, participants
- **Vol**: Identificador, viatge associat, companyia, número de vol, origen, destí, hora sortida, hora arriba, preu
- **Allotjament**: Identificador, viatge associat, nom, adreça, data entrada, data sortida, preu
- **Activitat**: Identificador, viatge associat, nom, descripció, ubicació, data i hora
- **SegmentTransport**: Identificador, viatge associat, punt origen, punt destí, mètode de transport, ordre al timeline
- **Menú**: Identificador, viatge associat, dia, tipus (dinar/sopar), plats
- **Despesa**: Identificador, viatge associat, concepte, import, pagador, participants, data
- **Liquidació**: Identificador, viatge associat, deutor, creditor, import pendent
- **TascaChecklist**: Identificador, viatge associat, nom, responsable, estat (completada/pendent)
- **Document**: Identificador, viatge associat, nom, contingut Base64, tipus MIME
- **Amic**: Identificador, usuari, usuari amic, estat de la relació

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Els usuaris poden completar el procés de creació d'un viatge en menys de 2 minuts
- **SC-002**: L'aplicació funciona correctament offline sense perdre dades
- **SC-003**: El sistema processa el càlcul de liquidacions en menys d'1 segon per a grups de fins a 20 persones
- **SC-004**: El 90% dels usuaris poden crear un viatge amb tots els mòduls funcionals al primer intent
- **SC-005**: L'aplicació mostra el botó de Google Maps i obre l'aplicació nativa amb la ruta correcta
