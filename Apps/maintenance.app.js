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
    { path: '/menu/:id?', component: Menu },
    { path: '/salon', component: Salon },
    { path: '/configuration', component: Configuration },
  ]
})

const initialTables = `[{"arrayNumber":0,"rect":{"type":"rect","originX":"left","originY":"top","left":136.86,"top":144.31,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.73,"scaleY":4.73,"angle":29.47,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},"tableSits":"3","tableNumber":"2","occupied":false,"disabled":false},{"arrayNumber":1,"rect":{"type":"rect","originX":"left","originY":"top","left":331,"top":43,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.51,"scaleY":2.51,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},"tableSits":"9","tableNumber":"8","occupied":false,"disabled":false}]`



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
    // // TODO: Remove temporal table configuration 
    this.localTables = JSON.parse(initialTables);
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