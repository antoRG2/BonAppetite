import {
    Measurements
} from './modules/measurements'

const MaintenanceStore = new Vuex.Store({
    modules: {
        measurements: Measurements
    }
})

export {
    MaintenanceStore
};