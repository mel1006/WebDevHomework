<template>
  <div id="app">
    <HeaderComponent />
    <main class="app-main">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { HeaderComponent, FooterComponent }
}
</script>

<style>

#app { font-family: Avenir, Helvetica, Arial, sans-serif; color: #2c3e50; }
.app-main { padding: 16px; min-height: calc(100vh - 140px); /* leave space for header/footer */ }
</style>
