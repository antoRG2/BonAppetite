import './maintenance/styles.less';
import "./node_modules/simple-line-icons/less/simple-line-icons.less";
import Vuetable from 'vuetable-2';
Vue.use(Vuetable);
Vue.use(VueRouter)

import Home from './maintenance/components/home.vue';
import Categories from './maintenance/components/categories.vue';
import Dishes from './maintenance/components/dishes.vue';
import Menu from './maintenance/components/menu.vue';
import Salon from './maintenance/components/salon.vue';
import Configuration from './maintenance/components/configuration.vue';
import ApiService from './maintenance/services/api.service';

const Ingredients = { template: '<div>Ingredientes</div>' }

let api = new ApiService();
let categories = api.categories;
let dishes = api.dishes;

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/categorias', component: Categories},
    { path: '/platillos', component: Dishes },
    { path: '/menu', component: Menu },
    { path: '/salon', component: Salon },
    { path: '/configuration', component: Configuration },
  ]
})

const app = new Vue({
  router,
  data: {
    localCategories: categories,
    localDishes: dishes,
    localTables: [],
    localFloor: {
      name:'Salon 1',
      backgroundColor: "#FAF7F8",
      size: {
        width: 500,
        height: 500
      }
    }
  },
  created: function() {
    this.$on('save:configuration', ( _tablesConfiguration, _floorConfiguration) => {
      console.log( _tablesConfiguration, _floorConfiguration );
      this.localTables = _tablesConfiguration;
      this.loalFloor = _floorConfiguration;
    })
  },
  methods: {
    tablesListener: function( args) {
      console.log( args );
    }
  }
}).$mount('#app');