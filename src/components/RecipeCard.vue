<template>
  <router-link :to="{ name: 'RecipeDetail', params: { id: recette.id } }" class="recipe-card">
    <div class="card-image-wrapper">
      <img
        v-if="recette.imageUrl"
        :src="recette.imageUrl"
        :alt="recette.titre"
        class="card-image"
        loading="lazy"
      />
      <div v-else class="card-image card-image--placeholder">
        <OpenMoji emoji="🍽️" :size="72" alt="Pas d'image" />
      </div>
      <span v-if="recette.difficulte" class="difficulty-badge" :class="difficultyClass">
        {{ recette.difficulte }}
      </span>
    </div>

    <div class="card-content">
      <h3>{{ recette.titre }}</h3>
      <p class="card-description">{{ recette.description }}</p>
      <div class="card-meta">
        <span v-if="recette.tempsPreparation" class="meta-item">
          <OpenMoji emoji="⏱️" :size="14" alt="Temps" />
          {{ recette.tempsPreparation }} min
        </span>
        <span v-if="recette.portions" class="meta-item">
          <OpenMoji emoji="👥" :size="14" alt="Portions" />
          {{ recette.portions }}
        </span>
        <span v-if="recette.categorie" class="meta-item">
          <OpenMoji :emoji="categorieIcon" :size="14" :alt="recette.categorie" />
          {{ recette.categorie }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import OpenMoji from './OpenMoji.vue'
import { recetteCategorieEmojis } from '../utils/emoji-map'

const props = defineProps({
  recette: {
    type: Object,
    required: true
  }
})

const difficultyClass = computed(() => {
  switch (props.recette.difficulte) {
    case 'Facile': return 'difficulty--easy'
    case 'Moyen': return 'difficulty--medium'
    case 'Difficile': return 'difficulty--hard'
    default: return ''
  }
})

const categorieIcon = computed(() => {
  return recetteCategorieEmojis[props.recette.categorie] || '🍽️'
})
</script>

<style scoped>
.recipe-card {
  display: flex;
  flex-direction: column;
  background: #1e1e38;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid rgba(139, 120, 200, 0.12);
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(45, 212, 191, 0.2);
  border-color: rgba(45, 212, 191, 0.35);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-card:hover .card-image {
  transform: scale(1.05);
}

.card-image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a3a4a, #162a3a);
}

.difficulty-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 9px;
  border-radius: 16px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  backdrop-filter: blur(8px);
}

.difficulty--easy {
  background: rgba(52, 211, 153, 0.85);
  color: #064e3b;
}

.difficulty--medium {
  background: rgba(251, 191, 36, 0.85);
  color: #78350f;
}

.difficulty--hard {
  background: rgba(248, 113, 113, 0.85);
  color: #7f1d1d;
}

.card-content {
  padding: 1rem 1.25rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  margin: 0 0 0.4rem;
  color: #e8e0f5;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-description {
  color: #9a8fb8;
  font-size: 0.82rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-meta {
  display: flex;
  gap: 0.85rem;
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(45, 212, 191, 0.12);
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.72rem;
  color: #2dd4bf;
  font-weight: 500;
}

@media (max-width: 768px) {
  .card-image {
    height: 200px;
  }

  .card-content {
    padding: 0.85rem 1rem 1rem;
  }
}
</style>
