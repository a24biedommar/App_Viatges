# Implementation Checklist: ViatgerPro Vermell

**Purpose**: Validar el compliment de l'especificació i la constitució durant el desenvolupament
**Created**: 2026-03-17
**Feature**: specs/001-viatgerpro-vermell/spec.md

## Configuració del Projecte

- [x] CHK001 Projecte Nuxt 3 inicialitzat amb ssr: false
- [x] CHK002 Tailwind CSS configurat i integrat
- [x] CHK003 SweetAlert2 instal·lat i funcional
- [ ] CHK004 Capacitor configurat per a APK Android
- [x] CHK005 PWA amb manifest i Service Worker
- [x] CHK006 Estructura de carpetes segons constitució

## Infraestructura de Base

- [x] CHK007 Implementat servei IndexedDB en JS pur
- [x] CHK008 Implementada esquema de base de dades
- [x] CHK009 Implementat sistema d'autenticació local
- [x] CHK010 Implementades utilitats ES5 (generador IDs, validacions)

## Mòduls de Viatge

- [x] CHK011 Mòdul de Logística (vols i allotjaments) implementat
- [x] CHK012 Mòdul Itinerari amb timeline estil Google Calendar
- [x] CHK013 Transport Connectiu implementat amb Google Maps
- [x] CHK014 Mòdul Menús (dinar/sopar) implementat
- [x] CHK015 Finances i Split de despeses implementat
- [x] CHK016 Eines (checklist, documents, conversor) implementat

## Sistema Social

- [x] CHK017 Gestió d'amics implementada
- [x] CHK018 Sistema d'invitacions (link i sol·licitud) implementat

## UI/UX

- [x] CHK019 Footer amb 4 seccions (Explorar, Amics, Notificacions, Perfil)
- [x] CHK020 Estil Vueling/Airbnb amb color vermell #E20613
- [x] CHK021 Text específic a la pàgina de Perfil

## Constitució ES5

- [x] CHK022 Tot el codi en català amb camelCase
- [x] CHK023 Ús de var (no const/let)
- [x] CHK024 Ús de function (no arrow functions)
- [x] CHK025 Ús de if/else (no operadors ternaris)
- [x] CHK026 Ús de for/while (no .map(), .filter(), .reduce(), .forEach())
- [x] CHK027 Esquema de comentaris amb blocs ===
- [x] CHK028 Try/Catch per a tota gestió d'errors
- [x] CHK029 SweetAlert per a totes les alertes

## Validació Final

- [x] CHK030 Test offline de l'aplicació
- [ ] CHK031 Verificació de generació APK
- [x] CHK032 Validació de compliment de constitució

## Notes

- Elements marcats com [x] indicate completat
- Els elements incomplets requereixen actualització de l'especificació abans de continuar
- Verificar constitució abans de cada pull request
