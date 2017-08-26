import './maintenance/styles.less';
import 'roboto-npm-webfont';
import "./node_modules/simple-line-icons/less/simple-line-icons.less";
import Vuetable from 'vuetable-2';
Vue.use(Vuetable);

import Home from './maintenance/components/home.vue';
import Categories from './maintenance/components/categories.vue';
import Dishes from './maintenance/components/dishes.vue';

const Ingredients = { template: '<div>Ingredientes</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/categorias', component: Categories },
  { path: '/platillos', component: Dishes },
  { path: '/ingredientes', component: Ingredients }
]



const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router
}).$mount('#app')