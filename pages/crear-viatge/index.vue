<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-8">
    <!-- Contingut del formulari -->
    <div class="w-full max-w-sm">
      <h2 class="text-xl font-semibold text-[#1F2937] mb-6 text-center">Crear nou viatge</h2>
      
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
        
        <!-- Data d'inici amb disseny -->
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2 font-medium">Data d'inici</label>
          <div class="relative">
            <input
              v-model="nouViatge.dataInici"
              type="date"
              class="input-field pl-11 cursor-pointer"
              required
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        
        <!-- Data de fi amb disseny -->
        <div class="mb-6">
          <label class="block text-sm text-gray-600 mb-2 font-medium">Data de fi</label>
          <div class="relative">
            <input
              v-model="nouViatge.dataFi"
              type="date"
              class="input-field pl-11 cursor-pointer"
              required
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          class="btn-primary mb-4"
          :disabled="carregant"
        >
          {{ carregant ? 'Creant...' : 'Crear viatge' }}
        </button>
      </form>
      
      <NuxtLink to="/explorar" class="btn-secondary block text-center">
        Cancel·lar
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { ref } from 'vue'
import { desar } from '~/js/services/db/serveiIndexedDB.js'

const carregant = ref(false)
const nouViatge = ref({
  nom: '',
  descripcio: '',
  dataInici: '',
  dataFi: ''
})

const generarId = (prefix) => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}`
}

const desarViatge = async () => {
  carregant.value = true
  
  try {
    // Obtenir usuari actual des de sessionStorage
    const usuariJson = sessionStorage.getItem('usuariActual')
    const usuari = usuariJson ? JSON.parse(usuariJson) : null
    
    if (!usuari) {
      window.location.href = '/login'
      return
    }
    
    const idViatge = generarId('viatge')
    const viatge = {
      id: idViatge,
      nom: nouViatge.value.nom,
      descripcio: nouViatge.value.descripcio || '',
      dataInici: nouViatge.value.dataInici,
      dataFi: nouViatge.value.dataFi,
      propietariId: usuari.id,
      participants: [usuari.id],
      estat: 'actiu',
      dataCreat: new Date().toISOString(),
      dataActualitzat: new Date().toISOString()
    }
    
    await desar('viatges', viatge)
    
    if (window.Swal) {
      window.Swal.fire({
        title: 'Èxit!',
        text: 'Viatge creat correctament',
        icon: 'success',
        confirmButtonColor: '#E20613'
      }).then(() => {
        window.location.href = '/explorar'
      })
    } else {
      window.location.href = '/explorar'
    }
  } catch (error) {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Error!',
        text: error.message || 'Error al crear el viatge',
        icon: 'error',
        confirmButtonColor: '#E20613'
      })
    }
    carregant.value = false
  }
}
</script>
