// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import App from './App'
import router from './router'
import {
  ServerTable,
  ClientTable,
  Event
} from 'vue-tables-2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/styles/styles.less'
import 'vue-nav-tabs/themes/vue-tabs.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(ClientTable)
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App, ClientTable
  }
})
