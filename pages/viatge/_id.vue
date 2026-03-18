<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-16">
    <!-- Header -->
    <header class="bg-white px-4 py-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <a href="/explorar" class="flex items-center text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </a>
        <h1 class="text-lg font-bold text-[#1F2937] flex-1 text-center">{{ viatge.nom || 'Viatge' }}</h1>
        <button class="text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Tabs de navegació -->
    <div class="bg-white border-b border-gray-100">
      <div class="flex overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="tabActiu = tab.id"
          class="flex-1 min-w-0 py-3 px-2 text-center text-sm font-medium relative whitespace-nowrap"
          :class="tabActiu === tab.id ? 'text-vermell' : 'text-gray-500'"
        >
          <span v-html="tab.icona" class="block w-5 h-5 mx-auto mb-1"></span>
          {{ tab.nom }}
          <div v-if="tabActiu === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-vermell"></div>
        </button>
      </div>
    </div>

    <!-- Contingut principal -->
    <div v-if="viatge" class="flex-1 pb-16">
      <!-- Logística Tab -->
      <div v-if="tabActiu === 'logistica'">
        <div class="p-4">
          <!-- Vols section -->
          <section class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-[#1F2937]">Vols</h3>
              <button class="text-vermell text-sm font-medium">+ Afegir vol</button>
            </div>
            <div v-if="vols.length > 0" class="space-y-3">
              <div v-for="vol in vols" :key="vol.id" class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div class="flex items-center">
                  <div class="w-12 h-12 rounded-lg bg-vermell-50 flex items-center justify-center mr-3">
                    <svg class="w-6 h-6 text-vermell" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-[#1F2937]">{{ vol.origen }} - {{ vol.desti }}</p>
                    <p class="text-sm text-gray-500">{{ vol.data }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-vermell">{{ vol.preu }}€</p>
                    <p class="text-xs text-gray-400">{{ vol.companyia }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-400">
              <p>No hi ha vols afegits</p>
            </div>
          </section>
        </div>
      </div>

      <!-- Itinerari Tab -->
      <div v-if="tabActiu === 'itinerari'">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-[#1F2937] mb-4">Itinerari</h3>
          <div class="space-y-4">
            <div v-for="(activitat, index) in timeline" :key="index" class="flex items-start">
              <div class="w-20 text-sm text-gray-500 text-right pr-3 pt-1">{{ activitat.hora }}</div>
              <div class="w-3 h-3 rounded-full bg-vermell -mt-1 flex-shrink-0"></div>
              <div class="flex-1 pl-4">
                <p class="font-semibold text-[#1F2937]">{{ activitat.titol }}</p>
                <p class="text-sm text-gray-500">{{ activitat.descripcio }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Finances Tab -->
      <div v-if="tabActiu === 'finances'">
        <div class="p-4">
          <div class="bg-vermell text-white rounded-xl p-4 mb-4">
            <p class="text-sm opacity-80">Total gastat</p>
            <p class="text-3xl font-bold">{{ totalGastat }}€</p>
          </div>
          <h3 class="text-lg font-semibold text-[#1F2937] mb-3">Despeses</h3>
          <div v-if="despeses.length > 0" class="space-y-3">
            <div v-for="despesa in despeses" :key="despesa.id" class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-vermell-50 flex items-center justify-center mr-3">
                  <span class="text-vermell font-semibold">{{ despesa.categoria }}</span>
                </div>
                <div>
                  <p class="font-medium text-[#1F2937]">{{ despesa.concepte }}</p>
                  <p class="text-xs text-gray-400">{{ despesa.pagatPer }}</p>
                </div>
              </div>
              <p class="font-bold text-vermell">{{ despesa.import }}€</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400">
            <p>No hi ha despeses afegides</p>
          </div>
        </div>
      </div>

      <!-- Eines Tab -->
      <div v-if="tabActiu === 'eines'">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-[#1F2937] mb-4">Eines</h3>
          <div class="grid grid-cols-2 gap-4">
            <button class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-vermell-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-xl">🧳</span>
              </div>
              <p class="font-medium text-[#1F2937]">Maletes</p>
            </button>
            <button class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-vermell-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-xl">📄</span>
              </div>
              <p class="font-medium text-[#1F2937]">Documents</p>
            </button>
            <button class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-vermell-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-xl">💶</span>
              </div>
              <p class="font-medium text-[#1F2937]">Moneda</p>
            </button>
            <button class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-vermell-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-xl">⚙️</span>
              </div>
              <p class="font-medium text-[#1F2937]">Ajustos</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenirUsuariActual } from '~/js/services/auth/autenticacio.js'
import { obtenirPerClau, obtenirPerIndex } from '~/js/services/db/serveiIndexedDB.js'

export default {
  name: 'PaginaViatge',
  data: function() {
    return {
      viatge: { nom: 'Viatge de prova' },
      tabActiu: 'logistica',
      tabs: [
        { id: 'logistica', nom: 'Logística', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>' },
        { id: 'itinerari', nom: 'Itinerari', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' },
        { id: 'finances', nom: 'Finances', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
        { id: 'eines', nom: 'Eines', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' }
      ],
      vols: [],
      allotjaments: [],
      despeses: [],
      timeline: [],
      totalGastat: 0
    };
  },
  mounted: function() {
    this.inicialitzar();
  },
  methods: {
    inicialitzar: function() {
      var self = this;
      
      console.log('Inicialitzant viatge...');
      
      if (typeof window !== 'undefined') {
        var idViatge = this.obtenirIdViatge();
        console.log('ID Viatge:', idViatge);
        
        // Check if user is logged in using sessionStorage directly
        var usuariJson = sessionStorage.getItem('usuariActual');
        console.log('Usuari JSON:', usuariJson);
        
        if (!usuariJson) {
          console.log('No hi ha usuari a sessionStorage, redirigint a login');
          window.location.href = '/login';
          return;
        }
        
        try {
          var usuari = JSON.parse(usuariJson);
          console.log('Usuari carregat:', usuari);
          
          self.carregarDades(idViatge);
        } catch (e) {
          console.error('Error parsing usuari:', e);
          window.location.href = '/login';
        }
      }
    },
    obtenirIdViatge: function() {
      if (typeof window !== 'undefined') {
        var path = window.location.pathname;
        var parts = path.split('/');
        return parts[parts.length - 1];
      }
      return '';
    },
    carregarDades: function(idViatge) {
      var self = this;
      
      console.log('Carregant dades del viatge:', idViatge);
      
      // Load travel data
      var promesaViatge = obtenirPerClau('viatges', idViatge);
      promesaViatge.then(function(viatge) {
        console.log('Viatge obtingut:', viatge);
        if (!viatge) {
          console.log('Viatge no trobat, redirigint a explorar');
          window.location.href = '/explorar';
          return;
        }
        self.viatge = viatge;
      }).catch(function(error) {
        console.error('Error carregant viatge:', error);
        window.location.href = '/explorar';
      });
      
      // Load flights data
      var promesaVols = obtenirPerIndex('vols', 'viatgeId', idViatge);
      promesaVols.then(function(vols) {
        console.log('Vols obtinguts:', vols);
        self.vols = vols || [];
      }).catch(function(error) {
        console.error('Error carregant vols:', error);
        self.vols = [];
      });
      
      var promesaAllotjaments = obtenirPerIndex('allotjaments', 'viatgeId', idViatge);
      promesaAllotjaments.then(function(allotjaments) {
        console.log('Allotjaments obtinguts:', allotjaments);
        self.allotjaments = allotjaments || [];
      }).catch(function(error) {
        console.error('Error carregant allotjaments:', error);
        self.allotjaments = [];
      });
      
      var promesaDespeses = obtenirPerIndex('despeses', 'viatgeId', idViatge);
      promesaDespeses.then(function(despeses) {
        console.log('Despeses obtingudes:', despeses);
        self.despeses = despeses || [];
        self.calcularTotal();
      }).catch(function(error) {
        console.error('Error carregant despeses:', error);
        self.despeses = [];
        self.calcularTotal();
      });
      
      // Dades d'exemple per timeline
      self.timeline = [
        { tipus: 'activitat', hora: '09:00', titol: 'Arribada BCN', descripcio: 'Terminal 1' },
        { tipus: 'transport', puntOrigen: 'Aeroport', puntDesti: 'Hotel', icona: '🚶' },
        { tipus: 'activitat', hora: '12:00', titol: 'Sagrada Família', descripcio: 'Tour guiats' },
        { tipus: 'menjar', hora: '14:00', titol: 'Dinar', descripcio: 'Restaurant La Pepa' },
        { tipus: 'activitat', hora: '17:00', titol: 'Park Güell', descripcio: '2h' },
        { tipus: 'menjar', hora: '20:00', titol: 'Sopar', descripcio: 'Tapeo' }
      ];
      
      // Tasques d'exemple
      self.tasquesChecklist = [
        { id: '1', nom: 'Passaport', completat: true },
        { id: '2', nom: 'Roba interior', completat: true },
        { id: '3', nom: 'Carregador mòbil', completat: false },
        { id: '4', nom: 'Crema solar', completat: false }
      ];
    },
    calcularTotal: function() {
      var self = this;
      var total = 0;
      var i = 0;
      
      while (i < self.despeses.length) {
        total = total + (self.despeses[i].import || 0);
        i = i + 1;
      }
      
      self.totalGastat = total;
    },
    formatarPreu: function(importe) {
      if (importe === null || importe === undefined) return '0€';
      return importe.toFixed(2) + '€';
    },
    formatarHora: function(hora) {
      if (!hora) return '';
      var data = new Date(hora);
      return data.getHours().toString().padStart(2, '0') + ':' + data.getMinutes().toString().padStart(2, '0');
    },
    mostrarLiquidacio: function() {
      var text = 'Joan → Biel: 50€\nMaria → Biel: 75€\nPere → Joan: 25€';
      
      if (window.Swal) {
        window.Swal.fire({
          title: 'Qui deu a qui?',
          text: text,
          icon: 'info',
          confirmButtonColor: '#E20613'
        });
      }
    },
    afegirActivitat: function() {
      if (window.Swal) {
        window.Swal.fire({
          title: 'Afegir activitat',
          text: 'Funcionalitat en desenvolupament',
          icon: 'info',
          confirmButtonColor: '#E20613'
        });
      }
    },
    afegirTasca: function() {
      if (window.Swal) {
        window.Swal.fire({
          title: 'Afegir tasca',
          text: 'Funcionalitat en desenvolupament',
          icon: 'info',
          confirmButtonColor: '#E20613'
        });
      }
    },
    convertirMoneda: function() {
      // Taxes d'exemple
      var taxes = {
        'EUR-USD': 1.10,
        'EUR-GBP': 0.86,
        'USD-EUR': 0.91,
        'USD-GBP': 0.78,
        'GBP-EUR': 1.16,
        'GBP-USD': 1.28
      };
      
      var clau = this.monedaOrigen + '-' + this.monedaDesti;
      var taxa = taxes[clau] || 1;
      var resultat = this.quantitatMoneda * taxa;
      
      this.resultatMoneda = this.quantitatMoneda + ' ' + this.monedaOrigen + ' = ' + resultat.toFixed(2) + ' ' + this.monedaDesti;
    }
  }
}
</script>
