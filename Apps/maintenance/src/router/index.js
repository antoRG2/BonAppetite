import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

import Categories from '@/components/categories.vue';
import Dishes from '@/components/dishes.vue';
import Menu from '@/components/menu.vue';
import Salon from '@/components/salon.vue';
import Configuration from '@/components/configuration.vue';
import Measurements from '@/components/measurements.vue';
import Recipes from '@/components/recipes.vue';
import Ingredients from '@/components/ingredients.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/categorias',
      component: Categories
    },
    {
      path: '/platillos',
      component: Dishes
    },
    {
      path: '/menu/:id?',
      component: Menu
    },
    {
      path: '/salon',
      component: Salon
    },
    {
      path: '/configuracion',
      component: Configuration
    },
    {
      path: '/unidadesmedida',
      component: Measurements
    },
    {
      path: '/recetas/:id?',
      component: Recipes
    },
    {
      path: '/ingredientes',
      component: Ingredients
    }
  ]
})
