<template>
  <div>
    
    <div class="container text-left">
      <b-badge pill variant="success">{{message}} / Platillo Id: #{{dishId}}</b-badge>
    </div>

    <div class="main-tables container">
      <div class="row">
        <div class="col-md-6 text-left">
          Receta
        </div>
        <div class="col-md-6 text-left">
          Ingredientes
        </div>
      </div>
      <div class="row">
        <div class="recipes-table col-md-6">

          <v-client-table ref="tableRecipes" :api-mode="false" :data="recipes.items" :columns="recipes.fields" :options="recipes.options" data-path="data" pagination-path="">
            <template slot="actions" scope="props">
              <div class="table-button-container">
                <b-button variant="success" size="sm" @click="editRow(props.row)">
                  <i class="icon-pencil icons"></i>
                  </button>
                </b-button>

                <b-button variant="danger" size="sm" @click="deleteRow(props.row)">
                  <i class="icon-ban icons"></i>
                  </button>
                </b-button>
              </div>
            </template>
          </v-client-table>

        </div>
        <div class="ingredients-table  col-md-6">

          <v-client-table ref="tableIngredients" :api-mode="false" :data="ingredients.items" :columns="ingredients.fields" :options="ingredients.options" data-path="data" pagination-path="">
            <template slot="actions" scope="props">
              <div class="table-button-container">
                <b-button variant="success" size="sm" @click="editRow(props.row)">
                  <i class="icon-pencil icons"></i>
                  </button>
                </b-button>

                <b-button variant="danger" size="sm" @click="deleteRow(props.row)">
                  <i class="icon-ban icons"></i>
                  </button>
                </b-button>
              </div>
            </template>
          </v-client-table>

        </div>
      </div>
      <div class="row text-center">
        <b-button variant="success" size="sm" v-b-modal.modalCreate>
          Save
        </b-button>
        <b-button variant="danger" size="sm" v-b-modal.modalCreate>
          Cancel
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {

    return {
      ingredients: {
        options: {},
        fields: ['id', 'description', 'actions'],
        items: this.loadIngredientsItems()
      },
      recipes: {
        options: {},
        fields: ['id', 'description', 'actions'],
        items: this.loadRecipesItems()
      }
    }

  },
  computed: {
    message() {
      return this.$store.getters['recipes/getMessage'];
    },
    dishId() {
      return this.$route.params.id;
    }
  },
  methods: {
    loadRecipesItems() {
      return this.$store.getters['recipes/getList'].map(element => {
        return { ...element };
      });
    },
    loadIngredientsItems() {
      return this.$store.getters['ingredients/getList'].map(element => {
        return { ...element };
      });
    },
    newIngredient($event) {
      this.$store.commit({
        type: 'recipes/add',
        description: Date.now().toString()
      })
    },
  }
}
</script>
<style>

</style>
