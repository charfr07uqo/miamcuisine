<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <OpenMoji emoji="👨‍🍳" :size="36" alt="Chef" />
        <div>
          <h1>Miam Cuisine</h1>
          <p>Découvrez et partagez vos meilleures recettes</p>
        </div>
      </div>
    </section>

    <div class="toolbar" v-if="!store.loading && store.recettes.length > 0">
      <span class="recipe-count">
        <OpenMoji emoji="📖" :size="16" alt="Recettes" />
        {{ store.recettes.length }} recettes
      </span>
    </div>

    <div class="recipes-grid" v-if="!store.loading">
      <RecipeCard
        v-for="recette in store.recettes"
        :key="recette.id"
        :recette="recette"
      />
    </div>

    <div v-if="store.loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des recettes...</p>
    </div>

    <p v-if="!store.loading && store.recettes.length === 0" class="empty">
      <OpenMoji emoji="🍳" :size="48" alt="Cuisine" />
      <br />
      Aucune recette pour le moment. Soyez le premier à en ajouter !
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import RecipeCard from '../components/RecipeCard.vue'
import OpenMoji from '../components/OpenMoji.vue'

const store = useRecipeStore()

onMounted(() => {
  store.fetchRecettes()
})
</script>

<style scoped>
.hero {
  padding: 1.5rem 1.75rem;
  background: linear-gradient(135deg, #1a3a4a 0%, #1e2d45 50%, #16162a 100%);
  border-radius: 14px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(45, 212, 191, 0.2);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -60%;
  right: -15%;
  width: 300px;
  height: 300px;
  background: rgba(20, 184, 166, 0.08);
  border-radius: 50%;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 1.6rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ccfbf1;
}

.hero p {
  font-size: 0.9rem;
  opacity: 0.7;
  color: #5eead4;
  margin-top: 0.15rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding: 0 0.15rem;
}

.recipe-count {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #2dd4bf;
  font-weight: 500;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
  color: #8b78c8;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(45, 212, 191, 0.2);
  border-top-color: #14b8a6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty {
  text-align: center;
  color: #8b78c8;
  padding: 4rem 2rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .hero {
    padding: 1.25rem 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
  }

  .hero h1 {
    font-size: 1.3rem;
  }

  .hero p {
    font-size: 0.82rem;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .toolbar {
    margin-bottom: 1rem;
  }
}
</style>
