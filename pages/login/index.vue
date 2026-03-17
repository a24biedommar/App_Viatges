<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vermell mb-4">
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-[#1F2937]">ViatgerPro</h1>
    </div>

    <!-- Títols -->
    <h2 class="text-xl font-semibold text-[#1F2937] mb-6">Inicia sessió</h2>

    <!-- Formulari -->
    <form @submit.prevent="iniciarSessioHandler" class="w-full max-w-sm">
      <!-- Correu -->
      <div class="mb-4">
        <input
          v-model="correu"
          type="email"
          class="input-field"
          placeholder="Correu electrònic"
          required
        />
      </div>

      <!-- Contrasenya -->
      <div class="mb-6">
        <input
          v-model="contrasenya"
          type="password"
          class="input-field"
          placeholder="Contrasenya"
          required
        />
      </div>

      <!-- Botó Entrar -->
      <button
        type="submit"
        class="btn-primary mb-4"
        :disabled="carregant"
      >
        {{ carregant ? 'Iniciant...' : 'Entra' }}
      </button>
    </form>

    <!-- Enllaç oblidar contrasenya -->
    <p class="text-sm text-gray-500 mb-6">Has oblidat la contrasenya?</p>

    <!-- Separador -->
    <div class="w-full max-w-sm mb-6">
      <div class="border-t border-gray-200"></div>
    </div>

    <!-- Botó Registrar -->
    <button
      @click="mostrarRegistre = true"
      class="btn-secondary"
    >
      Registra't
    </button>

    <!-- Modal de registre -->
    <div v-if="mostrarRegistre" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-semibold mb-4">Crear compte</h3>
        
          <form @submit.prevent="registrar" class="w-full max-w-sm">
            <input
              v-model="nomRegistre"
              type="text"
              class="input-field mb-4"
              placeholder="Nom complet"
              required
            />
          
          <input
            v-model="correuRegistre"
            type="email"
            class="input-field mb-4"
            placeholder="Correu electrònic"
            required
          />
          
          <input
            v-model="contrasenyaRegistre"
            type="password"
            class="input-field mb-4"
            placeholder="Contrasenya"
            required
          />
          
          <input
            v-model="confirmarContrasenya"
            type="password"
            class="input-field mb-6"
            placeholder="Confirmar contrasenya"
            required
          />
          
          <button
            type="submit"
            class="btn-primary mb-4"
            :disabled="carregantRegistre"
          >
            {{ carregantRegistre ? 'Creant...' : 'Crear compte' }}
          </button>
        </form>
        
        <button
          @click="mostrarRegistre = false"
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
import { iniciarSessio, registrarUsuari } from '~/js/services/auth/autenticacio.js'

const correu = ref('')
const contrasenya = ref('')
const carregant = ref(false)
const mostrarRegistre = ref(false)
const nomRegistre = ref('')
const correuRegistre = ref('')
const contrasenyaRegistre = ref('')
const confirmarContrasenya = ref('')
const carregantRegistre = ref(false)

const iniciarSessioHandler = async () => {
  carregant.value = true
  try {
    await iniciarSessio(correu.value, contrasenya.value)
    window.location.href = '/explorar'
  } catch (error) {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#E20613',
        confirmButtonText: 'D\'acord'
      })
    } else {
      alert('Error: ' + error.message)
    }
  } finally {
    carregant.value = false
  }
}

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
    mostrarRegistre.value = false
    if (window.Swal) {
      window.Swal.fire({
        title: 'Èxit!',
        text: 'Compte creat correctament. Ara pots iniciar sessió.',
        icon: 'success',
        confirmButtonColor: '#E20613'
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
