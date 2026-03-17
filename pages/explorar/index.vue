<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-20">
    <!-- Header -->
    <header class="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
      <div>
        <h1 class="text-2xl font-bold text-[#1F2937]">Hola, Biel! 👋</h1>
      </div>
      <div class="w-10 h-10 rounded-full bg-vermell flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </header>

    <!-- Contingut principal -->
    <main class="px-4 py-6">
      <!-- Secció Pròxims Viatges -->
      <section class="mb-6">
        <h2 class="text-xl font-semibold text-[#1F2937] mb-4">Pròxims Viatges</h2>

        <!-- Llistat de viatges -->
        <div v-if="viatges.length > 0" class="space-y-4">
          <div 
            v-for="viatge in viatges" 
            :key="viatge.id"
            @click="obrirViatge(viatge.id)"
            class="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
          >
            <!-- Fons amb imatge o color -->
            <div 
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              :style="obtenirEstilFons(viatge)"
            ></div>
            
            <!-- Contingut sobre la imatge -->
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="text-white font-bold text-xl">{{ viatge.nom }}</h3>
              <p class="text-white/80 text-sm">{{ formatarDates(viatge.dataInici, viatge.dataFi) }}</p>
            </div>

            <!-- Pill d'estat -->
            <span 
              class="absolute top-3 right-3 pill"
              :class="viatge.estat === 'actiu' ? 'pill-active' : 'pill-pending'"
            >
              {{ viatge.estat === 'actiu' ? 'En curs' : 'Pendent' }}
            </span>
          </div>
        </div>

        <!-- Estat buit -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <p class="text-gray-500 mb-4">No tens cap viatge encara</p>
          <button @click="crearViatge" class="btn-primary">
            Crear el primer viatge
          </button>
        </div>
      </section>
    </main>

    <!-- FAB per crear viatge -->
    <button
      @click="crearViatge"
      class="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-vermell shadow-lg flex items-center justify-center text-white text-2xl hover:bg-vermell-fosc transition-transform hover:scale-110 z-40"
    >
      +
    </button>

    <!-- Modal per crear viatge -->
    <div v-if="mostrarModalCrear" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-semibold mb-4">Crear nou viatge</h3>
        
        <form @submit.prevent="desarViatge">
          <input
            v-model="nouViatge.nom"
            type="text"
            class="input-field mb-4"
            placeholder="Nom del viatge"
            required
          />
          
          <input
            v-model="nouViatge.descripcio"
            type="text"
            class="input-field mb-4"
            placeholder="Descripció (opcional)"
          />
          
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Data d'inici</label>
            <input
              v-model="nouViatge.dataInici"
              type="date"
              class="input-field"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">Data de fi</label>
            <input
              v-model="nouViatge.dataFi"
              type="date"
              class="input-field"
              required
            />
          </div>
          
          <button
            type="submit"
            class="btn-primary mb-4"
            :disabled="carregant"
          >
            {{ carregant ? 'Creant...' : 'Crear viatge' }}
          </button>
        </form>
        
        <button
          @click="mostrarModalCrear = false"
          class="w-full text-gray-500 text-sm"
        >
          Cancel·lar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenirUsuariActual } from '~/js/services/auth/autenticacio.js'
import { obtenirTots, desar } from '~/js/services/db/serveiIndexedDB.js'

const viatges = ref([])
const carregant = ref(false)
const mostrarModalCrear = ref(false)
const usuariActual = ref(null)
const nouViatge = ref({
  nom: '',
  descripcio: '',
  dataInici: '',
  dataFi: ''
})

const inicialitzar = async () => {
  try {
    const usuari = await obtenirUsuariActual()
    if (!usuari) {
      window.location.href = '/login'
      return
    }
    
    usuariActual.value = usuari
    await carregarViatges()
  } catch (error) {
    console.error('Error:', error)
    window.location.href = '/login'
  }
}

const carregarViatges = async () => {
  const result = await obtenirTots('viatges')
  viatges.value = result || []
  
  viatges.value.sort((a, b) => new Date(a.dataInici) - new Date(b.dataInici))
}

const crearViatge = () => {
  mostrarModalCrear.value = true
  nouViatge.value = {
    nom: '',
    descripcio: '',
    dataInici: '',
    dataFi: ''
  }
}

const desarViatge = async () => {
  carregant.value = true
  
  const idViatge = generarId('viatge')
  const viatge = {
    id: idViatge,
    nom: nouViatge.value.nom,
    descripcio: nouViatge.value.descripcio || '',
    dataInici: nouViatge.value.dataInici,
    dataFi: nouViatge.value.dataFi,
    propietariId: usuariActual.value.id,
    participants: [usuariActual.value.id],
    estat: 'actiu',
    dataCreat: new Date().toISOString(),
    dataActualitzat: new Date().toISOString()
  }
  
  try {
    await desar('viatges', viatge)
    carregant.value = false
    mostrarModalCrear.value = false
    await carregarViatges()
    
    if (window.Swal) {
      window.Swal.fire({
        title: 'Èxit!',
        text: 'Viatge creat correctament',
        icon: 'success',
        confirmButtonColor: '#E20613'
      })
    }
  } catch (error) {
    carregant.value = false
    
    if (window.Swal) {
      window.Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#E20613'
      })
    }
  }
}

const obrirViatge = (id) => {
  window.location.href = '/viatge/' + id
}

const formatarDates = (dataInici, dataFi) => {
  const inici = new Date(dataInici)
  const fi = new Date(dataFi)
  
  const diaInici = inici.getDate()
  const diaFi = fi.getDate()
  const mesFi = obtenirNomMes(fi.getMonth())
  
  return diaInici + ' - ' + diaFi + ' ' + mesFi
}

const obtenirNomMes = (mes) => {
  const mesos = ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des']
  return mesos[mes]
}

const obtenirEstilFons = (viatge) => {
  const colors = [
    'linear-gradient(to bottom, rgba(226, 6, 19, 0.6), rgba(0,0,0,0.8))',
    'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(0,0,0,0.8))',
    'linear-gradient(to bottom, rgba(16, 185, 129, 0.6), rgba(0,0,0,0.8))',
    'linear-gradient(to bottom, rgba(245, 158, 11, 0.6), rgba(0,0,0,0.8))'
  ]
  
  const index = viatge.id.charCodeAt(viatge.id.length - 1) % colors.length
  return 'background: ' + colors[index]
}

const generarId = (prefix) => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return prefix + '_' + timestamp + random
}

onMounted(inicialitzar)
</script>
