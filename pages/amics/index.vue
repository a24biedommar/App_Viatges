<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-16">
    <!-- Header -->
    <header class="bg-white px-4 py-4 border-b border-gray-100">
      <h1 class="text-xl font-bold text-[#1F2937]">Amics</h1>
    </header>

    <!-- Cercador -->
    <div class="p-4">
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="cercador"
          type="text"
          class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vermell-200"
          placeholder="Busca per nom o correu..."
        />
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white border-b border-gray-100">
      <div class="flex">
        <button
          @click="tabActiva = 'amics'"
          class="flex-1 py-3 text-center font-medium text-sm relative"
          :class="tabActiva === 'amics' ? 'text-vermell' : 'text-gray-500'"
        >
          Els meus amics
          <span v-if="amicsFiltrats.length > 0" class="ml-1">({{ amicsFiltrats.length }})</span>
          <div v-if="tabActiva === 'amics'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-vermell"></div>
        </button>
        <button
          @click="tabActiva = 'sollicituds'"
          class="flex-1 py-3 text-center font-medium text-sm relative"
          :class="tabActiva === 'sollicituds' ? 'text-vermell' : 'text-gray-500'"
        >
          Sol·licituds
          <span v-if="sollicitudsPendents.length > 0" class="ml-1">({{ sollicitudsPendents.length }})</span>
          <div v-if="tabActiva === 'sollicituds'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-vermell"></div>
        </button>
      </div>
    </div>

    <!-- Contingut -->
    <div class="p-4">
      <!-- Amics -->
      <div v-if="tabActiva === 'amics'">
        <div v-if="amicsFiltrats.length > 0" class="space-y-2">
          <div 
            v-for="amic in amicsFiltrats" 
            :key="amic.id"
            class="bg-white rounded-xl p-4 flex items-center"
          >
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-vermell flex items-center justify-center text-white font-semibold mr-3">
              {{ obtenirInicials(amic.nomAmic) }}
            </div>
            
            <!-- Info -->
            <div class="flex-1">
              <h3 class="font-semibold text-[#1F2937]">{{ amic.nomAmic }}</h3>
              <p class="text-sm text-gray-500">{{ amic.correuAmic }}</p>
            </div>
            
            <!-- Accions -->
            <button class="p-2 text-gray-400 hover:text-vermell">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-500">No tens amics encara</p>
        </div>
      </div>

      <!-- Sol·licituds -->
      <div v-if="tabActiva === 'sollicituds'">
        <div v-if="sollicitudsPendents.length > 0" class="space-y-2">
          <div 
            v-for="sollicitud in sollicitudsPendents" 
            :key="sollicitud.id"
            class="bg-white rounded-xl p-4 flex items-center"
          >
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold mr-3">
              {{ sollicitud.nom || '?' }}
            </div>
            
            <div class="flex-1">
              <h3 class="font-semibold text-[#1F2937]">{{ sollicitud.nom || 'Sol·licitud' }}</h3>
              <p class="text-sm text-gray-500">{{ sollicitud.correu || '' }}</p>
            </div>
            
            <button 
              @click="acceptarSollicitud(sollicitud.id)"
              class="px-3 py-1 bg-vermell text-white text-sm rounded-full mr-2"
            >
              Acceptar
            </button>
            <button 
              @click="rebutjarSollicitud(sollicitud.id)"
              class="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-full"
            >
              Rebutjar
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-500">No tens sol·licituds pendents</p>
        </div>
      </div>
    </div>

    <!-- Botó generar enllaç -->
    <div class="p-4 fixed bottom-16 left-0 right-0 bg-[#F9FAFB]">
      <button @click="generarEnllaç" class="btn-primary flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
        </svg>
        Generar enllaç d'invitació
      </button>
    </div>
  </div>
</template>

<script>
var serveiIndexedDB = null;
var autenticacio = null;

export default {
  name: 'PaginaAmics',
  data: function() {
    return {
      amics: [],
      sollicituds: [],
      buscador: '',
      tabActiva: 'amics'
    };
  },
  computed: {
    amicsFiltrats: function() {
      var self = this;
      if (!self.buscador) {
        return self.amics;
      }
      
      var cercadorLower = self.buscador.toLowerCase();
      var resultat = [];
      var i = 0;
      
      while (i < self.amics.length) {
        var amic = self.amics[i];
        if (
          (amic.nomAmic && amic.nomAmic.toLowerCase().indexOf(cercadorLower) !== -1) ||
          (amic.correuAmic && amic.correuAmic.toLowerCase().indexOf(cercadorLower) !== -1)
        ) {
          resultat.push(amic);
        }
        i = i + 1;
      }
      
      return resultat;
    },
    sollicitudsPendents: function() {
      var self = this;
      var resultat = [];
      var i = 0;
      
      while (i < self.sollicituds.length) {
        if (self.sollicituds[i].estat === 'pendent') {
          resultat.push(self.sollicituds[i]);
        }
        i = i + 1;
      }
      
      return resultat;
    }
  },
  mounted: function() {
    this.inicialitzar();
  },
  methods: {
    inicialitzar: function() {
      var self = this;
      
      if (typeof window !== 'undefined') {
        serveiIndexedDB = require('~/js/services/db/serveiIndexedDB');
        autenticacio = require('~/js/services/auth/autenticacio');
        
        var promesa = autenticacio.obtenirUsuariActual();
        
        promesa.then(function(usuari) {
          if (!usuari) {
            window.location.href = '/login';
            return;
          }
          
          self.carregarAmics();
        });
        
        promesa.catch(function() {
          window.location.href = '/login';
        });
      }
    },
    carregarAmics: function() {
      var self = this;
      var promesa = serveiIndexedDB.obtenirTots('amics');
      
      promesa.then(function(amics) {
        self.amics = amics || [];
      });
      
      var promesa2 = serveiIndexedDB.obtenirTots('invitacions');
      
      promesa2.then(function(invitacions) {
        self.sollicituds = invitacions || [];
      });
    },
    obtenirInicials: function(nom) {
      if (!nom) return '?';
      var parts = nom.split(' ');
      var inicials = '';
      var i = 0;
      while (i < parts.length && i < 2) {
        inicials = inicials + parts[i].charAt(0).toUpperCase();
        i = i + 1;
      }
      return inicials;
    },
    acceptarSollicitud: function(id) {
      var self = this;
      
      if (window.Swal) {
        window.Swal.fire({
          title: 'Èxit!',
          text: 'Sol·licitud acceptada',
          icon: 'success',
          confirmButtonColor: '#E20613'
        });
      }
      
      self.carregarAmics();
    },
    rebutjarSollicitud: function(id) {
      var self = this;
      self.carregarAmics();
    },
    generarEnllaç: function() {
      var enllaç = window.location.origin + '/invitacio/' + this.generarToken();
      
      if (window.Swal) {
        window.Swal.fire({
          title: 'Enllaç d\'invitació',
          html: '<p>Copia aquest enllaç per invitar amics:</p><code class="block mt-2 p-2 bg-gray-100 rounded">' + enllaç + '</code>',
          icon: 'info',
          confirmButtonColor: '#E20613'
        });
      }
    },
    generarToken: function() {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var resultat = '';
      var i = 0;
      while (i < 16) {
        resultat += chars.charAt(Math.floor(Math.random() * chars.length));
        i = i + 1;
      }
      return resultat;
    }
  }
}
</script>
