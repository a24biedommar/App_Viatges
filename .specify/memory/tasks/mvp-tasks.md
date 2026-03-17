---
description: "Tasques per al MVP de ViatgerPro Vermell"
---

# Tasques MVP: ViatgerPro Vermell

**Input**: Especificació de features de Viatjes_Biel
**Prioritat**: MVP amb 5 mòduls principals

## Format: `[ID] [P?] [Story] Descripció`

- **[P]**: Es pot executar en paral·lel (diferents fitxers, sense dependències)
- **[Story]**: A quina història d'usuari pertany (US1-US8)

---

## Fase 1: Configuració del Projecte

**Propòsit**: Inicialització del projecte Nuxt 3 amb totes les dependències

- [x] T001 [P] Inicialitzar projecte Nuxt 3 amb ssr: false
- [x] T002 [P] Configurar Tailwind CSS
- [x] T003 [P] Instal·lar i configurar SweetAlert2
- [ ] T004 [P] Configurar Capacitor per a generació APK
- [x] T005 [P] Configurar PWA amb manifest i Service Worker
- [x] T006 Configurar estructura de carpetes segons constitució

---

## Fase 2: Infraestructura de Base

**Propòsit**: Fonaments que han d'estar completats abans de qualsevol història d'usuari

- [x] T007 Implementar servei IndexedDB en JS pur (js/services/db/indexeddb.js)
- [x] T008 [P] Crear схема de base de dades per a usuaris, viatges i mòduls
- [x] T009 [P] Implementar sistema d'autenticació local
- [x] T010 Implementar utilitats ES5 (generador d'IDs, validacions)
- [x] T011 Configurar layouts principals amb footer de 4 seccions

**Checkpoint**: Infraestructura llesta - es pot començar a implementar històries d'usuari

---

## Fase 3: Història d'Usuari 1 - Inici de sessió i mode offline (P1)

**Objectiu**: Sistema de login amb sincronització i mode offline

- [x] T012 [P] [US1] Crear pàgina de login/register
- [x] T013 [P] [US1] Implementar servei d'autenticació amb IndexedDB
- [x] T014 [US1] Implementar lògica de detecció d'estat offline/online
- [x] T015 [US1] Implementar sincronització de dades (mock per ara)
- [x] T016 [US1] Integrar SweetAlert per a missatges d'error en català

---

## Fase 4: Història d'Usuari 2 - Gestió de viatges (P1)

**Objectiu**: Crear, editar i eliminar viatges

- [x] T017 [P] [US2] Crear model de Viatge (js/models/viatge.js)
- [x] T018 [P] [US2] Crear pàgina principal de llistat de viatges
- [x] T019 [US2] Implementar formulari de creació de viatge
- [x] T020 [US2] Implementar/edició de viatge
- [x] T021 [US2] Implementar eliminació de viatge amb confirmació SweetAlert

---

## Fase 5: Història d'Usuari 3 - Mòdul de Logística (P1)

**Objectiu**: Gestió de vols i allotjaments

- [x] T022 [P] [US3] Crear model de Vol (js/models/vol.js)
- [x] T023 [P] [US3] Crear model d'Allotjament (js/models/allotjament.js)
- [x] T024 [US3] Implementar компонент de llistat de vols
- [x] T025 [US3] Implementar formulari d'afegir vol
- [x] T026 [US3] Implementar компонент de llistat d'allotjaments
- [x] T027 [US3] Implementar formulari d'afegir allotjament
- [x] T028 [US3] Implementar ordre cronològic de vols

---

## Fase 6: Història d'Usuari 4 - Itinerari Intel·ligent (P1)

**Objectiu**: Timeline estil Google Calendar amb Transport Connectiu

- [x] T029 [P] [US4] Crear model d'Activitat (js/models/activitat.js)
- [x] T030 [P] [US4] Crear model de SegmentTransport (js/models/transport.js)
- [x] T031 [US4] Implementar компонент de timeline vertical
- [x] T032 [US4] Implementar formulari d'afegir activitat
- [x] T033 [US4] Implementar sistema de Transport Connectiu entre punts
- [x] T034 [US4] Implementar selector de mètode de transport (Bus, Metro, Caminant, Patinet, Bici)
- [x] T035 [US4] Integrar botó per obrir Google Maps amb ruta preconfigurada

---

## Fase 7: Història d'Usuari 5 - Planificació de Menús (P2)

**Objectiu**: Planificació de dinars i sopars per dia

- [x] T036 [P] [US5] Crear model de Menú (js/models/menu.js)
- [x] T037 [US5] Implementar компонент de planificació diària
- [x] T038 [US5] Implementar formulari de menú per dinar
- [x] T039 [US5] Implementar formulari de menú per sopar
- [x] T040 [US5] Mostrar menús ordenats per dia

---

## Fase 8: Història d'Usuari 6 - Finances i Split (P1)

**Objectiu**: Registre de despeses amb múltiples pagadors i liquidació

- [x] T041 [P] [US6] Crear model de Despesa (js/models/despesa.js)
- [x] T042 [P] [US6] Crear model de Liquidació (js/models/liquidacio.js)
- [x] T043 [US6] Implementar компонент de registre de despeses
- [x] T044 [US6] Implementar selector de participants i imports
- [x] T045 [US6] Implementar algoritme ES5 de liquidació de deutes
- [x] T046 [US6] Mostrar resum de qui ha de pagar a qui

---

## Fase 9: Història d'Usuari 7 - Eines (P2)

**Objectiu**: Checklist, documents i conversor

- [x] T047 [P] [US7] Crear model de TascaChecklist (js/models/checklist.js)
- [x] T048 [P] [US7] Crear model de Document (js/models/document.js)
- [x] T049 [US7] Implementar компонент de checklist de maletes
- [x] T050 [US7] Implementar assignació de responsables a tasques
- [x] T051 [US7] Implementar magatzem de documents en Base64
- [x] T052 [US7] Implementar conversor de moneda manual

---

## Fase 10: Història d'Usuari 8 - Sistema Social (P2)

**Objectiu**: Amics i invitacions a viatges

- [x] T053 [P] [US8] Crear model d'Amic (js/models/amic.js)
- [x] T054 [P] [US8] Crear model d'Invitació (js/models/invitacio.js)
- [x] T055 [US8] Implementar pàgina de llistat d'amics
- [x] T056 [US8] Implementar enviament de sol·licituds d'amistat
- [x] T057 [US8] Implementar sistema d'invitació a viatges via enllaç
- [x] T058 [US8] Implementar acceptació/rebuig d'invitacions

---

## Fase 11: Interfície i Footer

**Propòsit**: Components de navegació globals

- [x] T059 [P] Implementar footer amb 4 seccions (Explorar, Amics, Notificacions, Perfil)
- [x] T060 [P] Implementar pàgina Explorar
- [x] T061 [P] Implementar pàgina Amics
- [x] T062 [P] Implementar pàgina Notificacions
- [x] T063 [P] Implementar pàgina Perfil amb text personalitzat
- [x] T064 Aplicar estil Vueling/Airbnb amb color vermell corporatiu #E20613

---

## Fase 12: Polish i Validació

**Propòsit**: Millores finals i verificació

- [x] T065 Validar compliment de constitució ES5
- [x] T066 Verificar que totes les alertes utilitzen SweetAlert en català
- [x] T067 Testing offline de l'aplicació
- [ ] T068 Verificar generació d'APK amb Capacitor
- [x] T069 Documentar esquema de comentaris als fitxers de lògica

---

## Dependències i Ordre d'Execució

### Dependències de Fase

- **Fase 1 (Setup)**: Sense dependències - es pot començar immediatament
- **Fase 2 (Infraestructura)**: Depèn de Fase 1 - BLOQUEJA totes les històries
- **Fases 3-10 (User Stories)**: Totes depenen de Fase 2
- **Fase 11 (Interfície)**: Depèn de Fases 3-10
- **Fase 12 (Polish)**: Depèn de totes les fases anteriors

### Oportunitats de Paral·lelisme

- Totes les tasques marcades [P] poden executar-se en paral·lel
- Les tasques de model (T022, T023, T029, etc.) poden fer-se en paral·lel
- Les pàgines del footer (T060-T063) poden fer-se en paral·lel

---

## Estratègia d'Implementació

### MVP Primer (User Story 1 + 2 + 3 + 4 + 6)

1. Completar Fase 1: Setup
2. Completar Fase 2: Infraestructura
3. Completar US1 (T012-T016)
4. Completar US2 (T017-T021)
5. Completar US3 (T022-T028)
6. Completar US4 (T029-T035)
7. Completar US6 (T041-T046)
8. **VALIDAR**: Test de les funcionalitats bàsiques
9. Desplegar/演示

### Entrega Incremental

1. Setup + Infraestructura → Fonament llest
2. Afegir US1 + US2 → Gestió de viatges funciona
3. Afegir US3 + US4 → Logística i Itinerari funcionen
4. Afegir US5 → Menús funciona
5. Afegir US6 → Finances funciona
6. Afegir US7 → Eines funciona
7. Afegir US8 → Social funciona
8. Footer + Estil → Aplicació completa

---

## Notes

- Totes les tasques en català
- Codificació estrictament ES5
- Components Vue noms catalans
- Lògica de negoci分离 a fitxers .js purs
- Ús obligatori de SweetAlert per a alertes
- Gestió d'errors amb try/catch
