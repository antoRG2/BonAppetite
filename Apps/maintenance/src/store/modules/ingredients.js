const Ingredients = {
  namespaced: true,
  state: {
    list: [],
    message: "Ingredientes"
  },
  mutations: {
    add: (state, payload) => {
      state.list.push({
        description: payload.description,
        id: Math.floor(Math.random() * 1e6),
        measurement: {
          id: payload.measurement.id
        }
      });
    },
    delete: (state, payload) => {
      state.list = state.list.filter(element => {
        return element.id != payload.id;
      });
    },
    update: (state, payload) => {
      let element = state.list.filter(item => {
        return item.id === payload.id;
      })[0];

      element.description = payload.description;
      element.measurement = {
        id: payload.measurement.id
      };

      return element;
    },
    init: (state, payload) => {
      state.list = Object.assign([], payload);
    }
  },
  actions: {
    load({commit, state}, list) {
        return new Promise((resolve, reject) => {
          commit('init', list);
          resolve(list);
        });
      }
  },
  getters: {
    getMessage: state => {
      return state.message;
    },
    getList: state => {
      return Object.assign([], state.list);
    }
  }
};

export { Ingredients };
