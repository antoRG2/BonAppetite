const Measurements = {
  namespaced: true,
  state: {
    list: [],
    message: "Unidades de medida"
  },
  mutations: {
    add: (state, payload) => {
      state.list.push({
        description: payload.description,
        id: Math.floor(Math.random() * 1e6),
        unity: payload.unity
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
      element.unity = payload.unity;

      return element;
    },
    init: (state, payload) => {
      state.list = Object.assign([],payload);
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

export { Measurements };
