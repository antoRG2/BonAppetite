<template>
  <div id="app">
    <b-navbar type="inverse" variant="primary" toggleable>
      <b-navbar-brand href="#">
        <router-link to="/">Restaurante</router-link>
      </b-navbar-brand>
      <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-nav is-nav-bar>
          <b-nav-item>
            <router-link to="/categorias">Categorias</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/platillos">Platillos</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/salon">Salón</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/configuracion">Configuración</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/unidadesmedida">Unidades de medida</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/ingredientes">Ingredientes</router-link>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <section class="master-section container">
      <router-view :dishes="localDishes" :tables="localTables" :floor="localFloor"></router-view>
    </section>
  </div>
</template>

<script>
import ApiService from '@/services/api.service'
import {
  MaintenanceStore
} from '@/store/maintenance';

let api = new ApiService();
let categories = api.categories;
let dishes = api.dishes;
let measurements = api.measurements;
let ingredients = api.ingredients;

const initialTables = `[{"arrayNumber":0,"rect":{"type":"rect","originX":"left","originY":"top","left":136.86,"top":144.31,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.73,"scaleY":4.73,"angle":29.47,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},"tableSits":"3","tableNumber":"2","occupied":false,"disabled":false},{"arrayNumber":1,"rect":{"type":"rect","originX":"left","originY":"top","left":331,"top":43,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.51,"scaleY":2.51,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},"tableSits":"9","tableNumber":"8","occupied":false,"disabled":false}]`;

export default {
  name: 'app',
  store: MaintenanceStore,
  data() {
    return {
      localDishes: dishes,
      localTables: [],
      localFloor: {
        name: 'Salon 1',
        backgroundColor: "#FAF7F8",
        size: {
          width: 500,
          height: 500
        }
      },
      isLogged: true
    }
  },
  created: function() {
    // // TODO: Remove temporal table configuration 
    this.localTables = JSON.parse(initialTables);

    this.$store.dispatch('measurements/load', measurements).then(result => {

    });

    this.$store.dispatch('ingredients/load', ingredients).then(result => {

    });

    this.$store.dispatch('dishes/load', dishes.data).then(result => {

    });

    this.$store.dispatch('configuration/loadTables', this.localTables).then(result => {

    });
    this.$store.dispatch('configuration/loadFloor', this.localFloor).then(result => {

    });

    this.$store.dispatch('categories/load', categories.data).then(result => {

    });
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.master-section {
  padding-top: 15px;
}
</style>
