<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-16">
    <!-- Header -->
    <header class="bg-white px-4 py-4 border-b border-gray-100">
      <h1 class="text-xl font-bold text-[#1F2937]">Notificacions</h1>
    </header>

    <!-- Contingut -->
    <div class="p-4">
      <div v-if="notificacions.length > 0" class="space-y-3">
        <div 
          v-for="notificacio in notificacions" 
          :key="notificacio.id"
          class="bg-white rounded-2xl p-4 flex items-start shadow-sm border border-gray-100"
          :class="!notificacio.llegida ? 'border-l-4 border-vermell' : ''"
        >
          <!-- Icona -->
          <div class="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
               :class="obtenirColorIcona(notificacio.tipus)">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" v-html="obtenirIcona(notificacio.tipus)">
            </svg>
          </div>
          
          <!-- Contingut -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-[#1F2937] text-sm">{{ notificacio.titol }}</h3>
              <span class="text-xs text-gray-400 ml-2 flex-shrink-0">{{ notificacio.data }}</span>
            </div>
            <p class="text-sm text-gray-500 mt-1 truncate">{{ notificacio.descripcio }}</p>
          </div>
        </div>
      </div>
      
      <!-- Estat buit -->
      <div v-else class="text-center py-16">
        <div class="w-20 h-20 rounded-full bg-vermell-50 flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-vermell" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </div>
        <p class="text-gray-500 font-medium">No tens notificacions</p>
        <p class="text-sm text-gray-400 mt-1">Estaràs al dia de totes les novetats</p>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenirUsuariActual } from '~/js/services/auth/autenticacio.js'

export default {
  name: 'PaginaNotificacions',
  data: function() {
    return {
      notificacions: []
    };
  },
  mounted: function() {
    this.inicialitzar();
  },
  methods: {
    inicialitzar: function() {
      var self = this;
      
      if (typeof window !== 'undefined') {
        var promesa = obtenirUsuariActual();
        
        promesa.then(function(usuari) {
          if (!usuari) {
            window.location.href = '/login';
            return;
          }
          
          self.carregarNotificacions();
        });
        
        promesa.catch(function() {
          window.location.href = '/login';
        });
      }
    },
    carregarNotificacions: function() {
      // Notificacions d'exemple
      this.notificacions = [
        {
          id: '1',
          tipus: 'amic',
          titol: 'Nou amic',
          descripcio: 'Maria Garcia ara és el teu amic',
          data: 'Avui',
          llegida: false
        },
        {
          id: '2',
          tipus: 'viatge',
          titol: 'Invitació a un viatge',
          descripcio: 'Joan t\'ha convidat a "Cap de setmana a Barcelona"',
          data: 'Ahir',
          llegida: false
        },
        {
          id: '3',
          tipus: 'despesa',
          titol: 'Nova despesa',
          descripcio: 'Maria ha afegit una despesa de 45€ al viatge',
          data: '2 dies',
          llegida: true
        }
      ];
    },
    obtenirIcona: function(tipus) {
      if (tipus === 'amic') {
        return '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>';
      }
      if (tipus === 'viatge') {
        return '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>';
      }
      if (tipus === 'despesa') {
        return '<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
      }
      return '<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>';
    },
    obtenirColorIcona: function(tipus) {
      if (tipus === 'amic') return 'bg-blue-500';
      if (tipus === 'viatge') return 'bg-vermell';
      if (tipus === 'despesa') return 'bg-green-500';
      return 'bg-gray-400';
    }
  }
}
</script>
