import Vue from 'vue';
import Vuex from 'vuex';
import {
    Measurements
} from './modules/measurements'
import {
    Ingredients
} from './modules/ingredients'
import {
    Recipes
} from './modules/recipes'

import {
    Dishes
} from './modules/dishes'

import {
    Configuration
} from './modules/configuration'


Vue.use(Vuex)

const MaintenanceStore = new Vuex.Store({
    modules: {
        measurements: Measurements,
        ingredients: Ingredients,
        recipes: Recipes,
        dishes: Dishes,
        configuration: Configuration
    }
})

export {
    MaintenanceStore
};