<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-16">
    <!-- Contingut principal -->
    <div class="p-4">
      <!-- Perfil -->
      <div class="text-center py-8">
        <!-- Avatar -->
        <div class="w-20 h-20 rounded-full bg-vermell mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4">
          {{ inicials }}
        </div>
        
        <!-- Nom -->
        <h1 class="text-2xl font-bold text-[#1F2937]">{{ usuari ? usuari.nom : 'Usuari' }}</h1>
        <p class="text-gray-500">{{ usuari ? usuari.correu : '' }}</p>
      </div>

      <!-- Secció Easter Egg -->
      <div class="my-8 p-6 rounded-2xl" style="background-color: #FFF1F2; border: 2px dashed #E20613;">
        <div class="text-center">
          <div class="flex justify-center gap-1 mb-2">
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
          </div>
          
          <p class="text-[#1F2937] text-lg italic font-serif" style="font-family: Georgia, serif;">
            Aplicació feta per Biel per la seva xula,<br/>
            qualsevol persona que no sigui la xula o biel<br/>
            que me mengi els peus!<br/>
            <span class="text-vermell text-2xl">💗</span>
          </p>
          
          <div class="flex justify-center gap-1 mt-2">
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
            <span class="w-2 h-2 rounded-full bg-vermell"></span>
          </div>
        </div>
      </div>

      <!-- Opcions -->
      <div class="space-y-2">
        <button class="w-full bg-white rounded-xl p-4 flex items-center text-left">
          <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="text-[#1F2937]">Editar perfil</span>
        </button>
        
        <button class="w-full bg-white rounded-xl p-4 flex items-center text-left">
          <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-[#1F2937]">Configuració</span>
        </button>
      </div>

      <!-- Tancar sessió -->
      <button 
        @click="tancarSessioHandler"
        class="w-full mt-8 text-center text-gray-500 py-2"
      >
        Tancar sessió
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { obtenirUsuariActual, tancarSessio } from '~/js/services/auth/autenticacio.js'

const usuari = ref(null)

const inicials = computed(() => {
  if (!usuari.value || !usuari.value.nom) return '?'
  
  const parts = usuari.value.nom.split(' ')
  let result = ''
  
  for (let i = 0; i < parts.length && i < 2; i++) {
    result += parts[i].charAt(0).toUpperCase()
  }
  
  return result
})

onMounted(async () => {
  try {
    const user = await obtenirUsuariActual()
    if (!user) {
      window.location.href = '/login'
      return
    }
    usuari.value = user
  } catch {
    window.location.href = '/login'
  }
})

const tancarSessioHandler = async () => {
  if (window.Swal) {
    const result = await window.Swal.fire({
      title: 'Tancar sessió?',
      text: 'Segur que vols tancar la sessió?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E20613',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, tancar',
      cancelButtonText: 'Cancel·lar'
    })
    
    if (result.isConfirmed) {
      await tancarSessio()
      window.location.href = '/login'
    }
  }
}
</script>
