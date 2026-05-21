<template>
  <nav class="navbar">
    <router-link to="/" class="brand">
      <OpenMoji emoji="🍳" :size="22" alt="Miam Cuisine" />
      <span class="brand-text">Miam Cuisine</span>
    </router-link>

    <div class="nav-links">
      <router-link to="/" class="nav-link">Recettes</router-link>
      <router-link v-if="authStore.isAuthenticated" to="/ajouter" class="nav-link nav-link--add">+ Ajouter</router-link>

      <div v-if="authStore.isAuthenticated" class="user-info">
        <div class="avatar-wrapper">
          <img
            v-if="authStore.user?.photoURL"
            :src="authStore.user.photoURL"
            :alt="authStore.user.displayName || 'Avatar'"
            class="avatar"
            referrerpolicy="no-referrer"
          />
          <span v-else class="avatar avatar-fallback">
            {{ initials }}
          </span>
        </div>
        <span class="user-name">{{ authStore.user?.displayName || authStore.userEmail }}</span>
        <span v-if="authStore.isAdmin" class="badge-admin">Admin</span>
        <button class="btn-logout" @click="handleLogout">Déconnexion</button>
      </div>

      <router-link v-else to="/connexion" class="btn-login">Connexion</router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import OpenMoji from './OpenMoji.vue'

const authStore = useAuthStore()
const router = useRouter()

const initials = computed(() => {
  const name = authStore.user?.displayName || authStore.userEmail || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
})

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.5rem;
  background: rgba(16, 16, 32, 0.95);
  border-bottom: 1px solid rgba(45, 212, 191, 0.15);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
  z-index: 100;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #5eead4;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: #a89cc8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: #5eead4;
  background: rgba(45, 212, 191, 0.08);
}

.nav-link--add {
  color: #2dd4bf;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.75rem;
  border-left: 1px solid rgba(139, 120, 200, 0.2);
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(139, 120, 200, 0.3);
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
}

.user-name {
  font-size: 0.8rem;
  color: #b8aed0;
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge-admin {
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.btn-login {
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white !important;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.82rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s;
}

.btn-login:hover {
  background: linear-gradient(135deg, #0f766e, #0d9488);
  transform: translateY(-1px);
}

.btn-logout {
  background: none;
  border: 1px solid rgba(139, 120, 200, 0.25);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  color: #a89cc8;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-logout:hover {
  border-color: #2dd4bf;
  color: #5eead4;
  background: rgba(45, 212, 191, 0.08);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.5rem 0.75rem;
  }

  .brand {
    font-size: 1rem;
  }

  .brand-text {
    display: none;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
  }

  .user-info {
    border-left: none;
    padding-left: 0;
    gap: 0.4rem;
  }

  .user-name {
    display: none;
  }

  .btn-logout {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
