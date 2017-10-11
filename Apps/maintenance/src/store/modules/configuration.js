const Configuration = {
  namespaced: true,
  state: {
    tables: [],
    floor: {}
  },
  mutations: {
    initTables: (state, payload) => {
      state.tables = Object.assign([], payload);
    },
    initFloor: (state, payload) => {
      state.floor = Object.assign({}, payload);
    }
  },
  actions: {
    loadTables({ commit, state }, tables) {
      return new Promise((resolve, reject) => {
        commit("initTables", tables);
        resolve(tables);
      });
    },
    loadFloor({ commit, state }, floor) {
      return new Promise((resolve, reject) => {
        commit("initFloor", floor);
        resolve(floor);
      });
    }
  },
  getters: {
    getFloor: state => {
      return Object.assign({}, state.floor);
    },
    getTables: state => {
      return Object.assign([], state.tables);
    }
  }
};

export { Configuration };
