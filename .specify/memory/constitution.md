<!--
Sync Impact Report:
- Version change: N/A → 1.0.0 (nova constitució inicial)
- Modified principles: Tots els principis nous (n/a → I-IX)
- Added sections: 9 principis bàsics, 2 seccions addicionals, governança
- Removed sections: Cap (plantilla buida anterior)
- Templates requiring updates:
  - ✅ plan-template.md - cal actualitzar Constitution Check
  - ✅ spec-template.md - cal verificar alineació amb els nous principis
  - ✅ tasks-template.md - cal verificar categorització de tasques
  - ⚠️ commands/*.md - no existeixen fitxers de comandaments
- Follow-up TODOs: Cap
-->

# Viatjes Biel Constitution

## Principis Bàsics

### I. Llenguatge de Programació Català (OBLIGATORI)
Tots els elements del codi han d'estar en català: variables, funcions, rutes, comentaris i documentació. La nomenclatura ha d'utilitzar sempre camelCase.

### II. JavaScript ES5 Estricte (OBLIGATORI)
El codi ha de ser estrictament ES5. Queda prohibit l'ús de:
- `const` i `let` - cal utilitzar `var`
- Arrow functions (`=>`) - cal utilitzar la paraula clau `function`
- Operadors ternaris - cal utilitzar estructures `if/else` completes
- Mètodes moderns d'array (.map(), .filter(), .reduce(), .forEach()) - cal utilitzar bucles `for` o `while`

### III. Framework Nuxt 3 amb Configuració Específica (OBLIGATORI)
L'aplicació s'ha de construir amb Nuxt 3 configurat amb:
- `ssr: false` - renderitzat exclusivament client-side
- Optimització per a directori de sortida compatible amb Capacitor per a generar APK

### IV. PWA Offline-First (OBLIGATORI)
L'aplicació ha de funcionar com una PWA offline-first sense cap dependència d'APIs externes. Cal implementar:
- Service Worker per a cachear recursos
- Funcionament sense connexió a internet
- Sincronització de dades quan hi hagi connexió

### V. Persistència de Dades amb IndexedDB (OBLIGATORI)
La persistència de dades s'ha de realitzar exclusivament mitjançant IndexedDB. No s'utilitzaran altres sistemes d'emmagatzematge local o remot.

### VI. Separació de la Lògica de Negoci (OBLIGATORI)
La lògica de negoci ha d'estar separada dels components Vue en fitxers `.js` purs. Els components només han de contenir la lògica d'interfície.

### VII. Disseny amb Tailwind CSS i SweetAlert (OBLIGATORI)
Pel que fa al disseny:
- S'utilitzarà Tailwind CSS per a tots els estils
- La llibreria SweetAlert s'ha d'instal·lar i integrar obligatòriament per a tota la interfície d'alertes i notificacions

### VIII. Gestió d'Errors amb Try/Catch (OBLIGATORI)
La gestió d'errors s'ha de realitzar en tot moment amb blocs try/catch:
- Els missatges d'error s'han de mostrar a la consola del navegador
- Els missatges d'error s'han de mostrar mitjançant SweetAlert
- Tots els missatges d'error han d'estar en català

### IX. Esquema de Comentaris Rígid (OBLIGATORI)
Cada fitxer de lògica ha de seguir un esquema visual de comentaris:
- Bloc delimitat per línies de symbols igual (`================`) per a la secció d'IMPORTS
- Bloc delimitat per línies de symbols igual per a la secció de VARIABLES
- Bloc delimitat per línies de symbols igual per a la secció de FUNCIONS
- Dins de cada funció, el procés d'execució s'ha de documentar amb una llista numerada amb lletres (A. Pas 1, B. Pas 2, C. Pas 3) que expliqui detalladament cada acció i bucle realitzat

## Restriccions Addicionals

### Estructura de Fitxers
- Els fitxers de lògic de negoci han d'estar en carpetes separades dels components
- Cada mòdul de negoci ha de tenir el seu propi fitxer `.js`
- Els components Vue només contenen la interfície gràfica

### Convencions de Codificació
- Totes les funcions han de tenir una finalitat clara i específica
- El codi ha de ser llegible i autoexplicatiu
- Els bucles han de ser simples i fàcils de seguir

## Governança

**Procediment d'Enmienda**: Qualsevol canvi a aquesta constitució ha de ser documentat i aprovat abans de ser implementat.

**Política de Versions**: Les esmenes segueixen el format semàntic de versions:
- MAJOR: Canvis incompatibles amb versions anteriors en principis o regles fonamentals
- MINOR: Nous principis o seccions afegides
- PATCH: Clarificacions, correccions ortogràfiques o refinaments no semàntics

**Verificació de Compliment**: Totes les pull requests i revisions de codi han de verificar el compliment d'aquests principis.

**Versió**: 1.0.0 | **Ratificat**: 2026-03-17 | **Última Esmena**: 2026-03-17
