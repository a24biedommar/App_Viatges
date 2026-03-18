<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-8">
    <!-- Logo -->
    <div class="text-center mb-4">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vermell mb-2">
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>

    <!-- Títols -->
    <h2 class="text-xl font-semibold text-[#1F2937] mb-4">Crear compte</h2>

    <!-- Formulari -->
    <form @submit.prevent="registrar" class="w-full max-w-sm">
      <!-- Nom complet -->
      <div class="mb-4">
        <input
          v-model="nomRegistre"
          type="text"
          class="input-field"
          placeholder="Nom complet"
          required
        />
      </div>

      <!-- Correu -->
      <div class="mb-4">
        <input
          v-model="correuRegistre"
          type="email"
          class="input-field"
          placeholder="Correu electrònic"
          required
        />
      </div>

      <!-- Contrasenya -->
      <div class="mb-4">
        <input
          v-model="contrasenyaRegistre"
          type="password"
          class="input-field"
          placeholder="Contrasenya"
          required
        />
      </div>

      <!-- Confirmar contrasenya -->
      <div class="mb-6">
        <input
          v-model="confirmarContrasenya"
          type="password"
          class="input-field"
          placeholder="Confirmar contrasenya"
          required
        />
      </div>

      <!-- Botó Crear compte -->
      <button
        type="submit"
        class="btn-primary mb-4"
        :disabled="carregantRegistre"
      >
        {{ carregantRegistre ? 'Creant...' : 'Crear compte' }}
      </button>
    </form>

    <!-- Separador -->
    <div class="w-full max-w-sm mb-6">
      <div class="border-t border-gray-200"></div>
    </div>

    <!-- Text + Botó Iniciar sessió -->
    <p class="text-sm text-gray-500 mb-2">Ja tens compte?</p>
    <NuxtLink to="/login" class="text-vermell font-semibold text-sm hover:underline">
      Inicia sessió
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { ref } from 'vue'
import { registrarUsuari } from '~/js/services/auth/autenticacio.js'

const nomRegistre = ref('')
const correuRegistre = ref('')
const contrasenyaRegistre = ref('')
const confirmarContrasenya = ref('')
const carregantRegistre = ref(false)

const registrar = async () => {
  if (contrasenyaRegistre.value !== confirmarContrasenya.value) {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Error!',
        text: 'Les contrasenyes no coincideixen',
        icon: 'error',
        confirmButtonColor: '#E20613'
      })
    }
    return
  }

  carregantRegistre.value = true
  try {
    await registrarUsuari(nomRegistre.value, correuRegistre.value, contrasenyaRegistre.value)
    if (window.Swal) {
      window.Swal.fire({
        title: 'Èxit!',
        text: 'Compte creat correctament. Ara pots iniciar sessió.',
        icon: 'success',
        confirmButtonColor: '#E20613'
      }).then(() => {
        window.location.href = '/login'
      })
    }
  } catch (error) {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#E20613'
      })
    }
  } finally {
    carregantRegistre.value = false
  }
}
</script>
