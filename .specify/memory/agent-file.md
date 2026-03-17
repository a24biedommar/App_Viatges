# ViatgerPro Vermell Development Guidelines

Auto-generated from feature specifications. Last updated: 2026-03-17

## Active Technologies

- **Framework**: Nuxt 3 amb ssr: false
- **Plataforma**: PWA empaquetada amb Capacitor (Android APK)
- **Estil**: Tailwind CSS
- **Alertes**: SweetAlert2
- **Persistència**: IndexedDB (offline-first)
- **Llenguatge**: JavaScript ES5 estricte

## Project Structure

```text
Viatjes_Biel/
├── assets/
│   └── css/
│       └── tailwind.css
├── components/
│   ├── common/
│   ├── footer/
│   ├── logistics/
│   ├── itinerary/
│   ├── menu/
│   ├── finance/
│   └── tools/
├── pages/
│   ├── explorar/
│   ├── amics/
│   ├── notificacions/
│   └── perfil/
├── layouts/
│   └── default.vue
├── static/
│   └── icons/
├── js/
│   ├── services/
│   │   ├── db/
│   │   ├── auth/
│   │   └── sync/
│   ├── models/
│   └── utils/
├── nuxt.config.js
├── tailwind.config.js
└── package.json
```

## Code Style (ES5 Català)

- Totes les variables en català amb camelCase
- Utilitzar `var` (mai `const` o `let`)
- Funcions amb paraula clau `function` (mai arrow functions)
- Estructures `if/else` completes (mai operadors ternaris)
- Bucles `for` o `while` (mai .map(), .filter(), .reduce(), .forEach())
- Comentaris amb blocs `================` per seccions
- Llista numerada amb lletres (A. Pas 1, B. Pas 2...) dins de cada funció

## Constitution Rules

1. **Llenguatge**: Tot el codi, variables, funcions, rutes, comentaris i documentació en català
2. **ES5**: Prohibit const, let, arrow functions, ternary, mètodes moderns d'array
3. **Nuxt 3**: ssr: false, optimitzat per a Capacitor
4. **Offline-first**: PWA sense APIs externes, IndexedDB local
5. **SweetAlert**: Totes les alertes amb SweetAlert2 en català
6. **Try/Catch**: Gestió d'errors obligatòria amb blocs try/catch
7. **Esquema de comentaris**: Blocs === per IMPORTS, VARIABLES, FUNCIONS

## Commands

```bash
# Desenvolupament
npm run dev

# Build per producció
npm run build

# Generar APK Android
npx capacitor add android
npx capacitor build android
```

## Recent Changes

- 001-viatgerpro-vermell: Especificació inicial de l'aplicació ViatgerPro Vermell

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
