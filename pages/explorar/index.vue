<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col">
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
    <main class="px-4 py-6 flex-1">
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
        <div v-else class="text-center py-16">
          <div class="w-20 h-20 rounded-full bg-vermell-50 flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-vermell" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <p class="text-gray-500 font-medium">No tens cap viatge encara</p>
          <p class="text-sm text-gray-400 mt-1 mb-4">Comença a planificar el teu proper viatge</p>
          <NuxtLink to="/crear-viatge" class="btn-primary inline-block">
            Crear el primer viatge
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- FAB per crear viatge -->
    <NuxtLink to="/crear-viatge"
      class="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-vermell shadow-lg flex items-center justify-center text-white text-2xl hover:bg-vermell-fosc transition-transform hover:scale-110 z-40"
    >
      +
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenirUsuariActual } from '~/js/services/auth/autenticacio.js'
import { obtenirTots } from '~/js/services/db/serveiIndexedDB.js'

const viatges = ref([])
const carregant = ref(false)
const usuariActual = ref(null)

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
  try {
    const result = await obtenirTots('viatges')
    viatges.value = result || []
    
    viatges.value.sort((a, b) => new Date(a.dataInici) - new Date(b.dataInici))
  } catch (error) {
    console.error('Error carregant viatges:', error)
    viatges.value = []
  }
}

const obrirViatge = (id) => {
  console.log('Obrint viatge:', id);
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
  
  const randomIndex = viatge.id ? viatge.id.charCodeAt(viatge.id.length - 1) % colors.length : 0
  return `background-color: ${colors[randomIndex]}`
}

onMounted(() => {
  inicialitzar()
})
</script>
