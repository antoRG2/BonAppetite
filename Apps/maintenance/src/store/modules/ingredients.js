const Ingredients = {
    namespaced:true,
    state: {
        list: [],
        message: 'Ingredientes' 
    },
    mutations: {
        add: (state, payload) => {
            state.list.push(
                {
                    description: payload.description,
                    id: Math.floor( Math.random() * 1e6)
                }
            )
        },
        delete: (state, payload) => {
            state.list = state.list.filter( element => {
                return element.id != payload.id;
            });
        }
    },
    actions: {

    },
    getters: {
        getMessage: (state) => {
            return state.message;
        },
        getList: (state) => {
            return Object.assign([],state.list);
        }
    }
}

export {
    Ingredients
};