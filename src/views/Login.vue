<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Connexion</h1>

      <button class="btn-google" @click="handleGoogleLogin" :disabled="loading">
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Se connecter avec Google
      </button>

      <div class="separator">
        <span>ou</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required placeholder="votre@email.com" />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input id="password" v-model="password" type="password" required placeholder="••••••••" minlength="6" />
        </div>

        <p v-if="authStore.error" class="error">{{ authStore.error }}</p>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Chargement...' : (isRegister ? 'Créer le compte' : 'Se connecter') }}
        </button>
      </form>

      <p class="toggle">
        {{ isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?' }}
        <button type="button" class="btn-link" @click="isRegister = !isRegister">
          {{ isRegister ? 'Se connecter' : 'Créer un compte' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isRegister = ref(false)
const loading = ref(false)

async function handleGoogleLogin() {
  loading.value = true
  try {
    await authStore.loginWithGoogle()
    if (authStore.isAuthenticated) {
      router.push({ name: 'Home' })
    }
  } catch (err) {
    // error handled in store
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  loading.value = true
  try {
    if (isRegister.value) {
      await authStore.register(email.value, password.value)
    } else {
      await authStore.login(email.value, password.value)
    }
    router.push({ name: 'Home' })
  } catch (err) {
    // error handled in store
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: #1e1e38;
  padding: 2.5rem;
  border-radius: 14px;
  border: 1px solid rgba(45, 212, 191, 0.15);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #e8e0f5;
  margin-bottom: 2rem;
  font-size: 1.4rem;
}

.btn-google {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.8rem;
  background: #16162a;
  border: 1px solid rgba(139, 120, 200, 0.2);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #e0dce8;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.btn-google:hover:not(:disabled) {
  background: rgba(139, 120, 200, 0.08);
  border-color: rgba(139, 120, 200, 0.35);
}

.btn-google:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.google-icon {
  flex-shrink: 0;
}

.separator {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #5a4f7a;
  font-size: 0.82rem;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(139, 120, 200, 0.15);
}

.separator span {
  padding: 0 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #b8aed0;
  font-size: 0.88rem;
}

input {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1px solid rgba(139, 120, 200, 0.2);
  border-radius: 8px;
  font-size: 0.95rem;
  background: #16162a;
  color: #e0dce8;
  transition: border-color 0.2s;
}

input::placeholder {
  color: #5a4f7a;
}

input:focus {
  outline: none;
  border-color: #14b8a6;
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.15);
}

.error {
  color: #f87171;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.88rem;
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #0f766e, #0d9488);
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle {
  text-align: center;
  margin-top: 1.5rem;
  color: #8b78c8;
  font-size: 0.9rem;
}

.btn-link {
  background: none;
  border: none;
  color: #5eead4;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    padding: 1.75rem 1.25rem;
    border-radius: 10px;
  }
}
</style>
