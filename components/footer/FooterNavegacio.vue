<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
    <div class="flex justify-around items-center h-16 max-w-lg mx-auto">
      <NuxtLink to="/explorar" class="flex flex-col items-center justify-center flex-1 h-full" :class="esActiu('/explorar') ? 'text-vermell' : 'text-gray-400'">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1">Explorar</span>
      </NuxtLink>

      <NuxtLink to="/amics" class="flex flex-col items-center justify-center flex-1 h-full" :class="esActiu('/amics') ? 'text-vermell' : 'text-gray-400'">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="text-xs mt-1">Amics</span>
      </NuxtLink>

      <NuxtLink to="/notificacions" class="flex flex-col items-center justify-center flex-1 h-full" :class="esActiu('/notificacions') ? 'text-vermell' : 'text-gray-400'">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="text-xs mt-1">Notificacions</span>
      </NuxtLink>

      <NuxtLink to="/perfil" class="flex flex-col items-center justify-center flex-1 h-full" :class="esActiu('/perfil') ? 'text-vermell' : 'text-gray-400'">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs mt-1">Perfil</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'FooterNavegacio',
  methods: {
    esActiu: function(ruta) {
      if (typeof window !== 'undefined') {
        return window.location.pathname === ruta;
      }
      return false;
    }
  }
}
</script>

<style scoped>
.router-link-active {
  color: #E20613;
}
</style>
