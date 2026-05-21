import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import AddRecipe from '../views/AddRecipe.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/recette/:id', name: 'RecipeDetail', component: RecipeDetail, props: true },
  { path: '/ajouter', name: 'AddRecipe', component: AddRecipe, meta: { requiresAuth: true } },
  { path: '/connexion', name: 'Login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
