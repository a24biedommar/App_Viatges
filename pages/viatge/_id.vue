<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-16">
    <!-- Header -->
    <header class="bg-white px-4 py-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <NuxtLink to="/explorar" class="flex items-center text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </NuxtLink>
        <h1 class="text-lg font-bold text-[#1F2937] flex-1 text-center">{{ viatge ? viatge.nom : 'Viatge' }}</h1>
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

    <!-- Contingut segons tab -->
    <div class="p-4">
      <!-- Logística -->
      <div v-if="tabActiu === 'logistica'">
        <!-- Vols -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-[#1F2937]">Vols</h2>
            <button @click="mostrarModalVol = true" class="text-vermell text-sm font-medium">+ Afegir</button>
          </div>
          
          <div v-if="vols.length > 0" class="space-y-3">
            <div v-for="vol in vols" :key="vol.id" class="card">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-vermell-100 flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-vermell" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold">{{ vol.origen }} ➡️ {{ vol.desti }}</p>
                    <p class="text-sm text-gray-500">{{ vol.companyia }} · {{ vol.numeroVol }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-vermell">{{ formatarPreu(vol.preu) }}</p>
                  <p class="text-xs text-gray-500">{{ formatarHora(vol.horaSortida) }} - {{ formatarHora(vol.horaArriba) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>No tens vols afegits</p>
          </div>
        </div>

        <!-- Allotjaments -->
        <div>
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-[#1F2937]">Allotjaments</h2>
            <button @click="mostrarModalAllotjament = true" class="text-vermell text-sm font-medium">+ Afegir</button>
          </div>
          
          <div v-if="allotjaments.length > 0" class="space-y-3">
            <div v-for="allotjament in allotjaments" :key="allotjament.id" class="card">
              <div class="flex">
                <div class="w-20 h-16 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-semibold">{{ allotjament.nom }}</p>
                  <p class="text-sm text-gray-500">{{ allotjament.adreca }}</p>
                  <div class="flex justify-between mt-2 text-xs">
                    <div>
                      <span class="text-gray-400">Check-in:</span>
                      <span class="ml-1">{{ allotjament.horaEntrada }}</span>
                    </div>
                    <div>
                      <span class="text-gray-400">Check-out:</span>
                      <span class="ml-1">{{ allotjament.horaSortida }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-vermell">{{ formatarPreu(allotjament.preu) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>No tens allotjaments afegits</p>
          </div>
        </div>
      </div>

      <!-- Itinerari -->
      <div v-if="tabActiu === 'itinerari'">
        <div class="relative pl-8 border-l-2 border-gray-200">
          <div v-for="(item, index) in timeline" :key="index" class="relative mb-6">
            <!-- Punt de connexió -->
            <div 
              class="absolute -left-[33px] w-4 h-4 rounded-full border-2 border-white"
              :class="item.tipus === 'transport' ? 'bg-gray-300' : 'bg-vermell'"
            ></div>
            
            <!-- Contingut -->
            <div class="card">
              <div v-if="item.tipus === 'transport'" class="bg-gray-100 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">{{ item.icona }}</span>
                    <span class="text-sm">{{ item.puntOrigen }} → {{ item.puntDesti }}</span>
                  </div>
                  <button class="btn-outline text-xs">
                    Obrir Maps
                  </button>
                </div>
              </div>
              
              <div v-else>
                <span class="text-xs text-gray-500">{{ item.hora }}</span>
                <h3 class="font-semibold">{{ item.titol }}</h3>
                <p v-if="item.descripcio" class="text-sm text-gray-500">{{ item.descripcio }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button @click="afegirActivitat" class="w-full mt-4 border border-dashed border-gray-300 rounded-xl p-3 text-gray-500 text-center">
          + Afegir activitat
        </button>
      </div>

      <!-- Finances -->
      <div v-if="tabActiu === 'finances'">
        <!-- Targeta total -->
        <div class="bg-vermell rounded-2xl p-4 mb-6 text-white">
          <p class="text-sm opacity-80">Total gastat</p>
          <p class="text-3xl font-bold">{{ formatarPreu(totalGastat) }}</p>
        </div>

        <!-- Despeses -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-[#1F2937]">Despeses</h2>
            <button @click="mostrarModalDespesa = true" class="text-vermell text-sm font-medium">+ Afegir</button>
          </div>
          
          <div v-if="despeses.length > 0" class="space-y-2">
            <div v-for="despesa in despeses" :key="despesa.id" class="bg-white rounded-xl p-3 flex items-center justify-between border border-gray-100">
              <div>
                <p class="font-medium">{{ despesa.concepte }}</p>
                <p class="text-xs text-gray-500">Pagat per {{ despesa.pagador }}</p>
              </div>
              <span class="font-bold text-vermell">{{ formatarPreu(despesa.import) }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>No tens despeses</p>
          </div>
        </div>

        <!-- Botó liquidació -->
        <button @click="mostrarLiquidacio" class="btn-primary flex items-center justify-center gap-2">
          <span>💸</span>
          Qui deu a qui?
        </button>
      </div>

      <!-- Eines -->
      <div v-if="tabActiu === 'eines'">
        <div class="grid grid-cols-2 gap-4">
          <button @click="seccioActiva = 'maletes'" class="card text-center py-6">
            <span class="text-3xl">🧳</span>
            <p class="mt-2 font-medium">Maletes</p>
          </button>
          
          <button @click="seccioActiva = 'documents'" class="card text-center py-6">
            <span class="text-3xl">📄</span>
            <p class="mt-2 font-medium">Documents</p>
          </button>
          
          <button @click="seccioActiva = 'moneda'" class="card text-center py-6">
            <span class="text-3xl">💶</span>
            <p class="mt-2 font-medium">Moneda</p>
          </button>
          
          <button @click="seccioActiva = 'ajustos'" class="card text-center py-6">
            <span class="text-3xl">⚙️</span>
            <p class="mt-2 font-medium">Ajustos</p>
          </button>
        </div>

        <!-- Contingut secció -->
        <div v-if="seccioActiva === 'maletes'" class="mt-4">
          <h3 class="font-semibold mb-3">Checklist de maletes</h3>
          <div class="space-y-2">
            <label v-for="tasca in tasquesChecklist" :key="tasca.id" class="flex items-center bg-white rounded-xl p-3">
              <input type="checkbox" v-model="tasca.completat" class="w-5 h-5 text-vermell rounded mr-3" />
              <span :class="tasca.completat ? 'line-through text-gray-400' : ''">{{ tasca.nom }}</span>
            </label>
          </div>
          <button @click="afegirTasca" class="w-full mt-3 border border-dashed border-gray-300 rounded-xl p-2 text-gray-500">
            + Afegir tasca
          </button>
        </div>

        <div v-if="seccioActiva === 'moneda'" class="mt-4">
          <h3 class="font-semibold mb-3">Conversor de moneda</h3>
          <div class="card">
            <input type="number" v-model="quantitatMoneda" class="input-field mb-3" placeholder="Quantitat" />
            <select v-model="monedaOrigen" class="input-field mb-3">
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dòlar</option>
              <option value="GBP">GBP - Lliura</option>
            </select>
            <select v-model="monedaDesti" class="input-field mb-3">
              <option value="USD">USD - Dòlar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Lliura</option>
            </select>
            <button @click="convertirMoneda" class="btn-primary">Convertir</button>
            <p v-if="resultatMoneda" class="text-center mt-3 font-bold text-vermell">{{ resultatMoneda }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var serveiIndexedDB = null;
var autenticacio = null;

export default {
  name: 'PaginaViatge',
  data: function() {
    return {
      viatge: null,
      tabActiu: 'logistica',
      seccioActiva: '',
      vols: [],
      allotjaments: [],
      despeses: [],
      tasquesChecklist: [],
      timeline: [],
      totalGastat: 0,
      mostrarModalVol: false,
      mostrarModalAllotjament: false,
      mostrarModalDespesa: false,
      quantitatMoneda: 0,
      monedaOrigen: 'EUR',
      monedaDesti: 'USD',
      resultatMoneda: '',
      tabs: [
        { id: 'logistica', nom: 'Logística', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>' },
        { id: 'itinerari', nom: 'Itinerari', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' },
        { id: 'finances', nom: 'Finances', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
        { id: 'eines', nom: 'Eines', icona: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' }
      ]
    };
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
        
        var idViatge = this.obtenirIdViatge();
        
        var promesa = autenticacio.obtenirUsuariActual();
        
        promesa.then(function(usuari) {
          if (!usuari) {
            window.location.href = '/login';
            return;
          }
          
          self.carregarDades(idViatge);
        });
        
        promesa.catch(function() {
          window.location.href = '/login';
        });
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
      
      var promesaViatge = serveiIndexedDB.obtenirPerClau('viatges', idViatge);
      promesaViatge.then(function(viatge) {
        self.viatge = viatge;
      });
      
      var promesaVols = serveiIndexedDB.obtenirPerIndex('vols', 'viatgeId', idViatge);
      promesaVols.then(function(vols) {
        self.vols = vols || [];
      });
      
      var promesaAllotjaments = serveiIndexedDB.obtenirPerIndex('allotjaments', 'viatgeId', idViatge);
      promesaAllotjaments.then(function(allotjaments) {
        self.allotjaments = allotjaments || [];
      });
      
      var promesaDespeses = serveiIndexedDB.obtenirPerIndex('despeses', 'viatgeId', idViatge);
      promesaDespeses.then(function(despeses) {
        self.despeses = despeses || [];
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
