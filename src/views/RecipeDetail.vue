<template>
  <div class="recipe-detail" v-if="recette">
    <router-link to="/" class="back-link">
      <OpenMoji emoji="⬅️" :size="16" alt="Retour" />
      Retour aux recettes
    </router-link>

    <div class="recipe-header">
      <img v-if="recette.imageUrl" :src="recette.imageUrl" :alt="recette.titre" class="recipe-image" />
      <div class="recipe-info">
        <h1>{{ recette.titre }}</h1>
        <div class="meta">
          <span v-if="recette.tempsPreparation" class="meta-tag">
            <OpenMoji emoji="⏱️" :size="18" alt="Préparation" />
            Prépa : {{ recette.tempsPreparation }} min
          </span>
          <span v-if="recette.tempsCuisson" class="meta-tag">
            <OpenMoji emoji="🔥" :size="18" alt="Cuisson" />
            Cuisson : {{ recette.tempsCuisson }} min
          </span>
          <span v-if="recette.portions" class="meta-tag">
            <OpenMoji emoji="👥" :size="18" alt="Portions" />
            {{ recette.portions }} portions
          </span>
          <span v-if="recette.difficulte" class="meta-tag">
            <OpenMoji emoji="📊" :size="18" alt="Difficulté" />
            {{ recette.difficulte }}
          </span>
        </div>
        <p class="description">{{ recette.description }}</p>
        <p v-if="recette.notes" class="notes">
          <OpenMoji emoji="💡" :size="16" alt="Note" />
          <em>{{ recette.notes }}</em>
        </p>
      </div>
    </div>

    <div class="recipe-body">
      <div class="ingredients">
        <h2>
          <OpenMoji emoji="🥕" :size="24" alt="Ingrédients" />
          Ingrédients
        </h2>
        <ul>
          <li v-for="ing in recette.ingredientsDetails" :key="ing.ingredientId" class="ingredient-item">
            <OpenMoji :emoji="getEmoji(ing.ingredientId, ing.categorie)" :size="28" :alt="ing.nom" />
            <div class="ingredient-info">
              <strong>{{ ing.nom }}</strong>
              <span class="quantity">{{ ing.quantiteValeur }} {{ ing.unite }}</span>
            </div>
            <span class="type-badge" :class="'type--' + ing.type">{{ ing.type }}</span>
          </li>
        </ul>
      </div>

      <div class="steps">
        <h2>
          <OpenMoji emoji="👨‍🍳" :size="24" alt="Étapes" />
          Étapes
        </h2>
        <ol>
          <li v-for="(etape, index) in recette.etapes" :key="index">
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-text">{{ etape }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Chargement de la recette...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import OpenMoji from '../components/OpenMoji.vue'
import { getIngredientEmoji } from '../utils/emoji-map'

const route = useRoute()
const store = useRecipeStore()
const recette = ref(null)

function getEmoji(ingredientId, categorie) {
  return getIngredientEmoji(ingredientId, categorie)
}

onMounted(async () => {
  recette.value = await store.fetchRecetteById(route.params.id)
})
</script>

<style scoped>
.recipe-detail {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  color: #2dd4bf;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.recipe-header {
  margin-bottom: 2.5rem;
}

.recipe-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(45, 212, 191, 0.15);
}

.recipe-info h1 {
  font-size: 2rem;
  color: #e8e0f5;
  margin-bottom: 0.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.18);
  padding: 0.35rem 0.75rem;
  border-radius: 16px;
  font-size: 0.82rem;
  color: #5eead4;
  font-weight: 500;
}

.description {
  color: #9a8fb8;
  line-height: 1.7;
  font-size: 1rem;
}

.notes {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(20, 184, 166, 0.06);
  border-radius: 10px;
  border-left: 3px solid #14b8a6;
  color: #b8aed0;
  font-size: 0.88rem;
}

.recipe-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
}

.ingredients h2,
.steps h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e8e0f5;
  margin-bottom: 1.25rem;
  font-size: 1.2rem;
}

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid rgba(139, 120, 200, 0.1);
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-info {
  flex: 1;
}

.ingredient-info strong {
  display: block;
  font-size: 0.88rem;
  color: #e0dce8;
}

.quantity {
  font-size: 0.78rem;
  color: #2dd4bf;
}

.type-badge {
  font-size: 0.62rem;
  padding: 3px 7px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.type--liquide {
  background: rgba(96, 165, 250, 0.15);
  color: #93c5fd;
}

.type--solide {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.steps ol {
  list-style: none;
  padding: 0;
}

.steps li {
  display: flex;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(139, 120, 200, 0.08);
  line-height: 1.6;
}

.steps li:last-child {
  border-bottom: none;
}

.step-number {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
}

.step-text {
  color: #c4bdd8;
  font-size: 0.92rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #8b78c8;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(139, 120, 200, 0.2);
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .recipe-body {
    grid-template-columns: 1fr;
  }

  .recipe-info h1 {
    font-size: 1.5rem;
  }

  .recipe-image {
    max-height: 280px;
    border-radius: 10px;
  }
}
</style>
