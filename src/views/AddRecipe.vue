<template>
  <div class="add-recipe">
    <h1>Ajouter une recette</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titre *</label>
        <input id="title" v-model="form.title" type="text" required placeholder="Ex: Tarte aux pommes" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" rows="3" placeholder="Décrivez votre recette en quelques mots"></textarea>
      </div>

      <div class="form-group">
        <label>Image de la recette</label>
        <div class="image-upload" :class="{ 'has-preview': imagePreview }" @click="triggerFileInput" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
          <input ref="fileInput" type="file" accept="image/*" hidden @change="onFileSelected" />
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Aperçu" />
            <button type="button" class="btn-remove-image" @click.stop="removeImage" aria-label="Supprimer l'image">×</button>
          </div>
          <div v-else class="upload-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p>Cliquez ou glissez une image ici</p>
            <span class="upload-hint">PNG, JPG, WebP — max 5 Mo</span>
          </div>
        </div>
        <p v-if="uploadProgress > 0 && uploadProgress < 100" class="upload-progress">
          Upload en cours... {{ uploadProgress }}%
        </p>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="prepTime">Temps de préparation (min)</label>
          <input id="prepTime" v-model.number="form.prepTime" type="number" min="0" />
        </div>
        <div class="form-group">
          <label for="servings">Portions</label>
          <input id="servings" v-model.number="form.servings" type="number" min="1" />
        </div>
        <div class="form-group">
          <label for="difficulty">Difficulté</label>
          <select id="difficulty" v-model="form.difficulty">
            <option value="">Choisir</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Ingrédients *</label>
        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="list-item">
          <input v-model="form.ingredients[index]" type="text" placeholder="Ex: 200g de farine" />
          <button type="button" class="btn-remove" @click="removeIngredient(index)" aria-label="Supprimer l'ingrédient">×</button>
        </div>
        <button type="button" class="btn-add" @click="addIngredient">+ Ajouter un ingrédient</button>
      </div>

      <div class="form-group">
        <label>Étapes *</label>
        <div v-for="(step, index) in form.steps" :key="index" class="list-item">
          <textarea v-model="form.steps[index]" rows="2" :placeholder="'Étape ' + (index + 1)"></textarea>
          <button type="button" class="btn-remove" @click="removeStep(index)" aria-label="Supprimer l'étape">×</button>
        </div>
        <button type="button" class="btn-add" @click="addStep">+ Ajouter une étape</button>
      </div>

      <button type="submit" class="btn-submit" :disabled="submitting">
        {{ submitting ? 'Enregistrement...' : 'Publier la recette' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import { useAuthStore } from '../stores/auth'
import { storage } from '../firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const router = useRouter()
const recipeStore = useRecipeStore()
const authStore = useAuthStore()
const submitting = ref(false)

const fileInput = ref(null)
const imageFile = ref(null)
const imagePreview = ref(null)
const uploadProgress = ref(0)

const form = reactive({
  title: '',
  description: '',
  imageUrl: '',
  prepTime: null,
  servings: null,
  difficulty: '',
  ingredients: [''],
  steps: ['']
})

function triggerFileInput() {
  if (!imagePreview.value) {
    fileInput.value.click()
  }
}

function onFileSelected(event) {
  const file = event.target.files[0]
  if (file) processFile(file)
}

function onDragOver(event) {
  event.currentTarget.classList.add('drag-over')
}

function onDragLeave(event) {
  event.currentTarget.classList.remove('drag-over')
}

function onDrop(event) {
  event.currentTarget.classList.remove('drag-over')
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

function processFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert('L\'image ne doit pas dépasser 5 Mo')
    return
  }
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = null
  uploadProgress.value = 0
  if (fileInput.value) fileInput.value.value = ''
}

async function uploadImage(file) {
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const path = `recettes/${timestamp}_${safeName}`
  const fileRef = storageRef(storage, path)

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

function addIngredient() {
  form.ingredients.push('')
}

function removeIngredient(index) {
  if (form.ingredients.length > 1) {
    form.ingredients.splice(index, 1)
  }
}

function addStep() {
  form.steps.push('')
}

function removeStep(index) {
  if (form.steps.length > 1) {
    form.steps.splice(index, 1)
  }
}

async function handleSubmit() {
  submitting.value = true
  try {
    let imageUrl = ''
    if (imageFile.value) {
      imageUrl = await uploadImage(imageFile.value)
    }

    const recipe = {
      ...form,
      imageUrl,
      ingredients: form.ingredients.filter(i => i.trim()),
      steps: form.steps.filter(s => s.trim()),
      authorId: authStore.user?.uid,
      authorEmail: authStore.user?.email
    }
    const id = await recipeStore.addRecipe(recipe)
    router.push({ name: 'RecipeDetail', params: { id } })
  } catch (err) {
    alert('Erreur lors de la publication de la recette')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.add-recipe {
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  color: #e8e0f5;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #b8aed0;
  font-size: 0.9rem;
}

input, textarea, select {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1px solid rgba(139, 120, 200, 0.2);
  border-radius: 8px;
  font-size: 0.95rem;
  background: #1e1e38;
  color: #e0dce8;
  transition: border-color 0.2s;
}

input::placeholder, textarea::placeholder {
  color: #5a4f7a;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #14b8a6;
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.15);
}

select {
  cursor: pointer;
}

select option {
  background: #1e1e38;
  color: #e0dce8;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.list-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: flex-start;
}

.list-item input, .list-item textarea {
  flex: 1;
}

.btn-remove {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: rgba(248, 113, 113, 0.25);
}

.btn-add {
  background: none;
  border: 1px dashed rgba(45, 212, 191, 0.3);
  color: #5eead4;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.btn-add:hover {
  background: rgba(20, 184, 166, 0.08);
  border-color: #14b8a6;
}

.btn-submit {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
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

.image-upload {
  border: 2px dashed rgba(139, 120, 200, 0.3);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(30, 30, 56, 0.5);
}

.image-upload:hover, .image-upload.drag-over {
  border-color: #14b8a6;
  background: rgba(20, 184, 166, 0.05);
}

.image-upload.has-preview {
  padding: 0.5rem;
  cursor: default;
}

.upload-placeholder {
  color: #8b78c8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-placeholder p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.upload-placeholder .upload-hint {
  font-size: 0.8rem;
  color: #5a4f7a;
}

.image-preview {
  position: relative;
  display: inline-block;
  width: 100%;
}

.image-preview img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.btn-remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #f87171;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-remove-image:hover {
  background: rgba(0, 0, 0, 0.9);
}

.upload-progress {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #5eead4;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .add-recipe {
    padding: 0 0.25rem;
  }
}
</style>
