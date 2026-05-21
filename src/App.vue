<template>
  <div id="app">
    <Navbar />
    <main class="scroll-area">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background: #1a1a2e;
  color: #e0dce8;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem;
}

/* Scrollbar styling — flush to the right edge */
.scroll-area::-webkit-scrollbar {
  width: 8px;
}

.scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-area::-webkit-scrollbar-thumb {
  background: #2d4a5a;
  border-radius: 4px;
}

.scroll-area::-webkit-scrollbar-thumb:hover {
  background: #3d8b8b;
}

@media (max-width: 768px) {
  .container {
    padding: 0.75rem 0.5rem;
  }
}
</style>
