const Dishes = {
  namespaced: true,
  state: {
    list: [],
    message: "Dishes"
  },
  mutations: {
    add: (state, payload) => {
      state.list.push({
        name: payload.name,
        id: Math.floor(Math.random() * 1e6),
        price: payload.price,
        category: {
          id: payload.category.id
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

      element.name = payload.name,
      element.price = payload.price,
      element.category = {
        id: payload.category.id
      }

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

export { Dishes };
