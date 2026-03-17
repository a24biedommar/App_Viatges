# Implementation Plan: ViatgerPro Vermell

**Branch**: `001-viatgerpro-vermell` | **Date**: 2026-03-17 | **Spec**: specs/001-viatgerpro-vermell/spec.md
**Input**: Feature specification from ViatgerPro Vermell PWA travel app

## Summary

Desenvolupament d'una aplicació col·laborativa de gestió de viatges PWA empaquetada amb Capacitor. L'app funciona de forma híbrida: requereix Login per a sincronització en línia però utilitza IndexedDB localment per al mode offline. Inclou 5 mòduls per a cada viatge: Logística, Itinerari Intel·ligent, Planificació de Menús, Finances i Split, i Eines.

## Technical Context

**Language/Version**: JavaScript ES5  
**Primary Dependencies**: Nuxt 3, Tailwind CSS, SweetAlert2, Capacitor, IndexedDB  
**Storage**: IndexedDB (offline-first, cap API externa)  
**Testing**: Manual testing  
**Target Platform**: Android (APK), PWA offline-capable  
**Project Type**: Mobile Web Application (PWA)  
**Performance Goals**: Funcionament offline complet, sincronització quan hi hagi connexió  
**Constraints**: ES5 estricte, codi en català, SweetAlert per alertes, Try/Catch obligatori  
**Scale/Scope**: Aplicació per a usuaris individuals i grups de fins a 20 persones

## Constitution Check

*GATE: Must pass before implementation. Re-check after Phase 1 design.*

| Principi | Estat | Notes |
|----------|-------|-------|
| I. Llenguatge Català | ✅ Requisit | Tot el codi en català |
| II. JavaScript ES5 Estricte | ✅ Requisit | var, function, for/while |
| III. Nuxt 3 ssr:false | ✅ Requisit | Renderitzat client-side |
| IV. PWA Offline-first | ✅ Requisit | Service Worker + IndexedDB |
| V. IndexedDB | ✅ Requisit | Persistència exclusivament local |
| VI. Separació lògica | ✅ Requisit | Components .vue + fitxers .js |
| VII. Tailwind + SweetAlert | ✅ Requisit | Estils i alertes |
| VIII. Try/Catch | ✅ Requisit | Gestió d'errors obligatòria |
| IX. Esquema comentaris | ✅ Requisit | Blocs === i lletres A. Pas 1... |

## Project Structure

### Source Code

```text
Viatjes_Biel/
├── assets/
│   └── css/
│       └── tailwind.css
├── components/
│   ├── common/
│   ├── footer/
│   │   └── FooterNavegacio.vue
│   ├── logistics/
│   │   ├── LlistaVols.vue
│   │   ├── FormulariVol.vue
│   │   ├── LlistaAllotjaments.vue
│   │   └── FormulariAllotjament.vue
│   ├── itinerary/
│   │   ├── Timeline.vue
│   │   ├── FormulariActivitat.vue
│   │   └── SegmentTransport.vue
│   ├── menu/
│   │   ├── PlanificadorMenu.vue
│   │   └── FormulariMenu.vue
│   ├── finance/
│   │   ├── RegistreDespeses.vue
│   │   ├── LlistaDespeses.vue
│   │   └── Liquidacio.vue
│   └── tools/
│       ├── Checklist.vue
│       ├── GestorDocuments.vue
│       └── ConversorMoneda.vue
├── pages/
│   ├── explorar/
│   │   └── index.vue
│   ├── amics/
│   │   └── index.vue
│   ├── notificacions/
│   │   └── index.vue
│   ├── perfil/
│   │   └── index.vue
│   ├── login/
│   │   └── index.vue
│   └── viatge/
│       └── _id.vue
├── layouts/
│   └── default.vue
├── static/
│   └── icons/
├── js/
│   ├── services/
│   │   ├── db/
│   │   │   └── serveiIndexedDB.js
│   │   ├── auth/
│   │   │   └── autenticacio.js
│   │   └── sync/
│   │       └── sincronitzacio.js
│   ├── models/
│   │   ├── usuari.js
│   │   ├── viatge.js
│   │   ├── vol.js
│   │   ├── allotjament.js
│   │   ├── activitat.js
│   │   ├── transport.js
│   │   ├── menu.js
│   │   ├── despesa.js
│   │   ├── liquidacio.js
│   │   ├── checklist.js
│   │   ├── document.js
│   │   ├── amic.js
│   │   └── invitacio.js
│   └── utils/
│       ├── generadorId.js
│       ├── validacions.js
│       └── algoritmeLiquidacio.js
├── nuxt.config.js
├── tailwind.config.js
└── package.json
```

**Structure Decision**: Nuxt 3 SPA amb estructura clara de components Vue (interfície) i fitxers JS purs (lògica de negoci) seguint els principis de la constitució.

## Complexity Tracking

> **No hi ha violacions de la constitució** - el projecte segueix estrictament tots els principis definits.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Cap | N/A | N/A |

## Dependencies

### NPM Packages

```json
{
  "dependencies": {
    "nuxt": "^3.x",
    "sweetalert2": "^11.x",
    "idb": "^8.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "@nuxtjs/tailwindcss": "^6.x",
    "@capacitor/android": "^5.x",
    "@capacitor/cli": "^5.x"
  }
}
```

## Execution Order

1. **Fase 1**: Configuració projecte (T001-T006)
2. **Fase 2**: Infraestructura base (T007-T011)
3. **Fase 3-10**: Implementació mòduls (T012-T058)
4. **Fase 11**: UI/UX (T059-T064)
5. **Fase 12**: Validació (T065-T069)
