const Recipes = {
  namespaced: true,
  state: {
    list: [],
    message: "Recetas"
  },
  mutations: {
    add: (state, payload) => {
      state.list.push({
        ingredients: [],
        id: payload.id
      });
    },
    delete: (state, payload) => {
      state.list = state.list.filter(element => {
        return element.id != payload.id;
      });
    },
    addIngredient: (state, payload) => {
      let element = state.list.filter(item => {
        return item.id === payload.id;
      })[0];

      if(!element) {
        element = {
            id: payload.id,
            ingredients: payload.ingredients
        }

        state.list.push(element);
      }

      if(!element.ingredients) {
          element.ingredients = [];
      }

      element.ingredients.push({
        ...payload.ingredient
      });

      return element;
    },
    removeIngredient: (state, payload) => {
      let element = state.list.filter(item => {
        return item.id === payload.id;
      })[0];

      element.ingredients = element.ingredients.filter(item => {
        return item.id != payload.ingredient.id;
      });

      return element;
    },
    updateIngredient: (state, payload) => {
      let element = state.list.filter(item => {
        return item.id === payload.id;
      })[0];

      let ingredient = element.ingredients.filter(item => {
        return item.id === payload.ingredient.id;
      })[0];
      
      ingredient.quantity = payload.ingredient.quantity;
      
      return element;
    },
    init: (state, payload) => {
      state.list = Object.assign([], payload);
    }
  },
  actions: {},
  getters: {
    getMessage: state => {
      return state.message;
    },
    getList: state => {
      return Object.assign([], state.list);
    }
  }
};

export { Recipes };
