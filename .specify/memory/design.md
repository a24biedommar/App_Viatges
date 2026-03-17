# Disseny UI/UX: ViatgerPro Vermell

**Project**: ViatgerPro Vermell  
**Created**: 2026-03-17  
**Versió**: 2.0

---

## 1. Estils Globals (Design Tokens)

### Colors

| Nom | Hex | Ús |
|-----|-----|-----|
| Vermell Principal | `#E20613` | Botons principals, accents, navegació activa |
| Vermell Suau | `#FCA5A5` | Pills, badges, fons Vermell clar |
| Vermell Fosc | `#B91C1C` | Hover, estats actius |
| Fons | `#F9FAFB` | Fons principal de l'aplicació |
| Text Principal | `#1F2937` | Text negre/gris fosc |
| Text Secundari | `#6B7280` | Text secundari, placeholders |
| Blanc | `#FFFFFF` | Cards, inputs, fons de contingut |
| Gris Clar | `#E5E7EB` | Borders, línies divisòries |
| Blau Enllaç | `#3B82F6` | Enllaços, adreces cliquejables |
| Verd Exit | `#10B981` | Estats exit, confirmacions |
| Rosa Pastel | `#FFF1F2` | Fons de la secció Perfil (Easter Egg) |

### Radi de Cantonada

- Targetes: `16px`
- Botons: `16px`
- Inputs: `16px`
- Pills/Badges: `9999px` (completament rodó)

### Ombres

- Principal: `drop-shadow-sm` (ombra molt suau)
- Cards: `shadow-sm`
- FAB (Botó flotant): `shadow-lg`

---

## 2. Pàgina 1: Login / Inici

### Estructura

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         [Logo]                  │
│       ViatgerPro                │
│      Avió vermell              │
│                                 │
│       Inicia sessió             │
│                                 │
│  ┌─────────────────────────┐    │
│  │ corriol@exemple.com    │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ●●●●●●●●               │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │        Entra            │    │
│  └─────────────────────────┘    │
│                                 │
│    Has oblidat la contrasenya?  │
│                                 │
│            ───────              │
│                                 │
│      Tens compte? Registra't    │
│                                 │
│                                 │
├─────────────────────────────────┤
│ [Explorar] [Amics] [Notif] [Perfil] │
└─────────────────────────────────┘
```

### Components

**Logo**:
- Icona d'avió minimalista en vermell (#E20613)
- Text "ViatgerPro" a sota (opcional)

**Inputs**:
- Vora gris clara (`#E5E7EB`)
- Radius: `16px`
- Padding: `16px`
- En fer clic (focus): vora vermella (`#E20613`), `ring-2 ring-vermell-200`

**Botó Principal ("Entra")**:
- Fons: `#E20613`
- Text: Blanc, `font-semibold`
- Amplada: 100% (`w-full`)
- Radius: `16px`
- Padding: `py-4`
- Hover: `#B91C1C`

**Botó Secundari ("Registra't")**:
- Text: `#E20613`
- Sense fons
- `font-semibold`

---

## 3. Pàgina 2: Explorar (Dashboard)

### Estructura

```
┌─────────────────────────────────┐
│  Hola, Biel! 👋           [O]  │  ← Cercle de perfil
├─────────────────────────────────┤
│                                 │
│  Pròxims Viatges                │
│                                 │
│  ┌─────────────────────────┐    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │  ← Imatge amb gradient
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │▓▓▓▓ PARÍS 2026 ▓▓▓▓▓▓▓▓▓▓│    │  ← Text sobre imatge
│  │▓▓▓ 15 - 20 Abr  ▓▓▓▓▓▓▓▓▓▓│    │
│  │              [Pendent]     │    │  ← Pill cantonada
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  └─────────────────────────┘    │
│                                 │
│                           [+]   │  ← FAB
├─────────────────────────────────┤
│ [Explorar] [Amics] [Notif] [Perfil] │
└─────────────────────────────────┘
```

### Components

**Header**:
- Text: "Hola, [Nom]! 👋" - `text-2xl font-bold`
- Foto de perfil: Cercle de 40x40px a la dreta

**Secció "Pròxims Viatges"**:
- Títols: `text-xl font-semibold`

**Targetes de Viatge**:
- Format: Horizontal, imatge de fons
- Radius: `16px`
- Gradient: Negre semi-transparent a la base (`linear-gradient(to top, rgba(0,0,0,0.7), transparent)`)
- Contingut sobre la imatge:
  - Nom del destí: "París 2026" - `text-white font-bold text-xl`
  - Dates: "15 - 20 Abr" - `text-white text-sm`
- Pill (etiqueta): `bg-vermell-200 text-vermell-700 px-3 py-1 rounded-full text-xs font-medium`
  - "Pendent" o "En curs"

**Botó Flotant (FAB)**:
- Posició: Cantonada inferior dreta (`fixed bottom-20 right-4`)
- Cercle: `w-14 h-14 bg-vermell rounded-full shadow-lg`
- Icona: `+` blanca, centrada
- Hover: `scale-110`

---

## 4. Pàgina 3: Amics

### Estructura

```
┌─────────────────────────────────┐
│  Amics                          │
├─────────────────────────────────┤
│  ┌─────────────────────────┐    │
│  │ 🔍 Busca per nom...     │    │  ← Cercador arrodonit
│  └─────────────────────────┘    │
│                                 │
│  ┌──────────┬────────────┐      │
│  │Els meus   │Sol·licituds│     │  ← Tabs amb línia vermella
│  │amics     │  (2)       │     │
│  └──────────┴────────────┘      │
│  ─────────────────────────────  │
│                                 │
│  [O] Maria Garcia              │
│        mgarcia@email.com       │
│                          [💬]   │
│  ─────────────────────────────  │
│  [O] Joan Perez                        │
│        jperez@email.com       │
│                          [🗑️]   │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Generar enllaç 🔗       │    │  ← Botó gran
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│ [Explorar] [Amics] [Notif] [Perfil] │
└─────────────────────────────────┘
```

### Components

**Cercador**:
- Radius: `16px`
- Icona: Lupa a l'esquerra
- Placeholder: "Busca per nom o correu..."

**Tabs**:
- Dos pestanyes: "Els meus amics" | "Sol·licituds (n)"
- Pestanya activa: Línia vermella (`border-b-2 border-vermell`) a sota
- Text actiu: `text-vermell font-semibold`

**Llista d'Amics**:
- Avatar: Cercle de 48x48px a l'esquerra
- Nom: `font-semibold`
- Correu: `text-sm text-gris-500`
- Botons d'acció: Icones minimalistes (Xat, Eliminar)

**Botó "Generar enllaç d'invitació"**:
- Radius: `16px`
- Fons: `bg-vermell text-white`
- Icona: 🔗

---

## 5. Pàgina 4: El Viatge (Vista Principal)

### Sub-navegació (Tabs Superior)

```
┌─────────────────────────────────┐
│  ✈️ Viatge a París        [⚙️] │
├─────────────────────────────────┤
│  [Logística] [Itinerari] [Finances] [Eines] │
└─────────────────────────────────┘
```

**Tabs**:
- Icones + text per a cada mòdul
- Actiu: Icona i text vermells
- Inactiu: Icona i text grisos

---

### 5A. Pestanya Logística

```
┌─────────────────────────────────┐
│  ✈️ Viatge a París        [⚙️] │
├─────────────────────────────────┤
│ [Logística] [Itinerari] [Finances] [Eines] │
├─────────────────────────────────┤
│                                 │
│  VOLS                           │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ✈️ BCN ➡️ CDG          │    │
│  │    10:00 - 12:30       │    │  ← Hores en gran
│  │              150€      │    │  ← Preu cantonada
│  │    Vueling · VY1234    │    │
│  └─────────────────────────┘    │
│                                 │
│  ALLOTJAMENT                    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🏠 [Imatge petita]     │    │
│  │                         │    │
│  │  Hotel Marriot         │    │
│  │  📍 10 Rue de Paris    │    │  ← Enllaç blau
│  │                         │    │
│  │  Check-in  15:00       │    │
│  │  Check-out 11:00      │    │  ← Graella 2x2
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**Targeta Vol**:
- Icona d'avió
- Ruta: "BCN ➡️ CDG" - `font-semibold`
- Hores: "10:00 - 12:30" - `text-lg`
- Preu: Cantonada superior dreta - `font-bold text-vermell`
- Companyia: "Vueling · VY1234" - `text-sm text-gris-500`

**Targeta Allotjament**:
- Imatge petita (100x80px) a l'esquerra
- Nom de l'hotel
- Adreça: Icona 📍 + text - `text-blau-500` (enllaç)
- Graella 2x2 per a Check-in/Check-out

---

### 5B. Pestanya Itinerari (Timeline)

```
┌─────────────────────────────────┐
│  ✈️ Viatge a París        [⚙️] │
├─────────────────────────────────┤
│ [Logística] [Itinerari] [Finances] [Eines] │
├─────────────────────────────────┤
│                                 │
│  ║  09:00  ┃  Arribada BCN     │
│  ║         ┃  Terminal 1        │
│  ║─────────║                    │
│  ║  10:30  ┃  ░░░░░░░░░░░░░░   │  ← Connector Transport
│  ║         ┃  🚶 Hotel (45min)  │     (Fons gris clar)
│  ║         ┃  [Obrir Maps]     │     (Botó contorn vermell)
│  ║─────────║                    │
│  ║  12:00  ┃  🏛️ Sagrada Família│
│  ║         ┃  Tour guiats       │
│  ║─────────║  2h                │
│  ║  14:00  ┃  🍴 DINAR          │  ← Bloc menjar
│  ║         ┃  Restaurant La Pepa│
│  ║─────────║                    │
│  ║  17:00  ┃  🎨 Picasso       │
│  ║         │  Museu             │
│  ║─────────║                    │
│  ║  20:00  ┃  🍽️ SOPAR         │  ← Bloc menjar
│  ║         │  Tapeo            │
│                                 │
└─────────────────────────────────┘
```

**Timeline**:
- Línia vertical fina a l'esquerra (`border-l-2 border-gris-300`)
- Punts de connexió circulars als esdeveniments

**Bloc d'Activitat**:
- Hora: `font-bold`
- Icona + Títol: `font-semibold`
- Descripció: `text-sm text-gris-500`

**Connector de Transport**:
- Fons: `bg-gris-100`
- Icones: 🚌 (Bus), 🚇 (Metro), 🚶 (Caminant), 🛴 (Patinet), 🚲 (Bici)
- Text: "Punt A → Punt B (temps)"
- Botó "Obrir Maps": `border border-vermell text-vermell px-3 py-1 rounded-full text-sm`

**Blocs de Menjar**:
- Fons: `bg-vermell-50`
- Icona: 🍴 (Dinar) / 🍽️ (Sopar)
- Hora + Restaurant

---

### 5C. Pestanya Finances

```
┌─────────────────────────────────┐
│  ✈️ Viatge a París        [⚙️] │
├─────────────────────────────────┤
│ [Logística] [Itinerari] [Finances] [Eines] │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │  Total gastat           │    │  ← Targeta vermella
│  │  1.250€                │    │
│  └─────────────────────────┘    │
│                                 │
│  DESPESES                       │
│                                 │
│  ☕ Cafè           2,50€  🟢     │
│     Pagat per Biel               │
│  ─────────────────────────────  │
│  🍽️ Sopar          85€    🟢   │
│     Pagat per Maria              │
│  ─────────────────────────────  │
│  🎫 Metro           5,50€  🟢  │
│     Pagat per Biel               │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Qui deu a qui? 💸     │    │  ← Botó liquidació
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Targeta Total**:
- Fons: `bg-vermell text-white`
- Text: "Total gastat" - `text-sm opacity-80`
- Import: "1.250€" - `text-3xl font-bold`

**Llista de Despeses**:
- Icona per categoria
- Concepte + Import
- Badge: "Pagat per [Nom]"
- Separador: `border-b border-gris-200`

**Botó Liquidació**:
- Fons: `bg-vermell text-white`
- Icona: 💸
- En clicar: Obrir SweetAlert amb la llista de bizums pendents

---

## 6. Pàgina 5: Eines (Grid 2x2)

```
┌─────────────────────────────────┐
│  ✈️ Viatge a París        [⚙️] │
├─────────────────────────────────┤
│ [Logística] [Itinerari] [Finances] [Eines] │
├─────────────────────────────────┤
│                                 │
│  ┌───────────┐ ┌───────────┐    │
│  │  🧳      │ │  📄      │    │
│  │  Maletes  │ │ Documents │    │
│  │           │ │           │    │
│  └───────────┘ └───────────┘    │
│                                 │
│  ┌───────────┐ ┌───────────┐    │
│  │  💶      │ │  ⚙️      │    │
│  │  Moneda  │ │ Ajustes   │    │
│  │           │ │           │    │
│  └───────────┘ └───────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Grid**:
- 2 columnes, 2 files
- Gap: `16px`
- Targetes quadrades/grans

**Botons**:
- Icona gran (32x32px)
- Text a sota
- Radius: `16px`
- Fons: `bg-white shadow-sm`
- Hover: `shadow-md scale-105`

---

## 7. Pàgina 6: Perfil (Easter Egg)

```
┌─────────────────────────────────┐
│                                 │
│           [O]                   │  ← Foto gran (80x80px)
│        Biel                     │
│     biel@email.com              │
│                                 │
│  ┌─────────────────────────┐    │
│  │  .  .  .  .  .  .  .  │    │  ← Vora de punts
│  │ .  .  .  .  .  .  .  .│    │
│  │                         │    │
│  │  Aplicació feta per    │    │
│  │  Biel per la seva xula │    │
│  │                         │    │
│  │  Qualsevol persona    │    │
│  │  que no sigui la xula │    │
│  │  o biel que me       │    │
│  │  mengi els peus!     │    │
│  │            💗         │    │
│  │                         │    │
│  │ .  .  .  .  .  .  .  .│    │
│  │  .  .  .  .  .  .  .  │    │
│  └─────────────────────────┘    │
│                                 │
│        Tancar sessió            │  ← Text gris
│                                 │
├─────────────────────────────────┤
│ [Explorar] [Amics] [Notif] [Perfil] │
└─────────────────────────────────┘
```

**Secció "Sobre l'App"**:
- Fons: `bg-rosa-pastel (#FFF1F2)`
- Vora: Patró de punts vermells
- Text: Estil escriptura a mà o cursiva elegant
- Contingut exacte: "Aplicació feta per Biel per la seva xula, qualsevol persona que no sigui la xula o biel que me mengi els peus! 💗"

**Tancar sessió**:
- Text: `text-gris-500`
- Sense botó, només text clicable

---

## 8. Footer (Navegació Persistent)

```
┌─────────────────────────────────┤
│ [🏠]    [👥]    [🔔]    [👤]    │
│ Explorar  Amics   Notif  Perfil│
```

**Estructura**:
- Fixed a la part inferior
- 4 icones igualment espaciades
- Alçada: 64px
- Fons: `bg-white`
- Border top: `border-t border-gris-200`

**Icones**:
- Estil: Línia fina (outline)
- Mida: 24x24px
- Inactiva: `text-gris-400`
- Activa: `text-vermell` (farcila/seleccionada)

**导航**:
- 🏠 Explorar
- 👥 Amics
- 🔔 Notificacions (Avisos)
- 👤 Perfil

---

## 9. Responsive Design

### Mòbil (Default)
- Layout d'una columna
- Footer fixed
- Touch-friendly (min 44px zones)
- Cards ocupen 100% amplada

### Tablet (≥768px)
- Layout de dues columnes per a llistes
- Més espai entre elements
- Max-width: 768px centrat

### Escriptori (≥1024px)
- Amplada màxima: 480px (com a mòbil centrat)
- Com a app mòbil/emulador
- Footer fixed

---

## 10. Components Comuns

### SweetAlert (Alertes)

```javascript
// Alerta èxit
Swal.fire({
  title: 'Èxit!',
  text: 'Operació realitzada',
  icon: 'success',
  confirmButtonColor: '#E20613'
});

// Alerta liquidació
Swal.fire({
  title: 'Qui deu a qui?',
  text: 'Joan → Biel: 50€\nMaria → Biel: 75€',
  icon: 'info',
  confirmButtonColor: '#E20613'
});
```

### Inputs

```html
<input 
  type="text"
  class="w-full px-4 py-4 bg-white border border-gris-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vermell focus:border-transparent"
  placeholder="Placeholder..."
/>
```

### Targetes

```html
<div class="bg-white rounded-2xl shadow-sm p-4 border border-gris-100">
  <!-- Contingut -->
</div>
```

---

**Document actualitzat segons les especificacions de disseny proporcionades**
