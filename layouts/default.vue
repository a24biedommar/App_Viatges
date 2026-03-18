<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col">
    <div class="flex-1">
      <slot />
    </div>
    <FooterNavegacio />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
</style>
