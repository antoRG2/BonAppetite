<template>
  <div>
    <div v-if="!dish.id">
      No se encontro receta para el platillo seleccionado.
    </div>
    <div class="main-tables container" v-if="dish.id">
      <div class="row text-left">
        <b-badge pill variant="success">{{message}} / Platillo Id: #{{dish.id}}</b-badge>
      </div>
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

          <v-client-table ref="tableRecipes" :api-mode="false" :data="recipeItems" :columns="recipes.fields" :options="recipes.options" data-path="data" pagination-path="">
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
            <template slot="ingredient" scope="props">
              {{computeIngredientName(props.row)}}
            </template>
            <template slot="id" scope="props">
              {{props.row.id}}
            </template>
            <template slot="quantity" scope="props">
              {{ computeQuantity(props.row.ingredient) }}
            </template>
          </v-client-table>

        </div>
        <div class="ingredients-table  col-md-6">

          <v-client-table ref="tableIngredients" :api-mode="false" :data="ingredients.items" :columns="ingredients.fields" :options="ingredients.options" data-path="data" pagination-path="">
            <template slot="actions" scope="props">
              <div class="table-button-container">

                <b-button variant="success" size="sm" @click="showRecipeIngredientModal(props.row)">
                  <i class="icon-plus icons"></i>
                  </button>
                </b-button>

              </div>
            </template>
          </v-client-table>

        </div>
      </div>
      <div class="row text-center">
        <b-button variant="danger" size="sm" @click="cancel">
          Volver
        </b-button>
      </div>
    </div>

    <b-modal ref="modalRecipeIngredient" id="modalRecipeIngredient" title="Ingrediente de Receta" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="id" v-model="selectedRecipeIngredient.ingredient.id" readonly></b-form-input>
        <br>
        <b-form-input type="text" placeholder="description" v-model="selectedRecipeIngredient.ingredient.description" readonly></b-form-input>
        <br>
        <b-form-input type="number" placeholder="Cantidad" v-model="selectedRecipeIngredient.ingredient.quantity"></b-form-input>
        <br>
      </form>
      <div slot="modal-footer" class="w-100 footer-buttons">
        <b-button size="sm" variant="warning" @click="add" v-if="!selectedRecipeIngredient.id">
          Agregar
        </b-button>
        <b-button size="sm" variant="primary" @click="update" v-if="selectedRecipeIngredient.id">
          Actualizar
        </b-button>
        <b-button size="sm" variant="danger" @click="hideRecipeIngredientModal">
          Cancel
        </b-button>
      </div>
    </b-modal>

  </div>
</template>
<script>
export default {
  props: [],
  data() {

    return {
      ingredients: {
        options: {},
        fields: ['description', 'actions'],
        items: this.loadIngredientsItems()
      },
      recipes: {
        options: {},
        fields: ['ingredient', 'quantity', 'actions']
      },
      selectedRecipeIngredient: {
        id: '',
        ingredient: {
          id: '',
          quantity: 0
        }
      }
    }

  },
  computed: {
    message() {
      return this.$store.getters['recipes/getMessage'];
    },
    dish() {
      const dishId = this.$route.params.id;
      const dish = this.$store.getters['dishes/getList'].filter(item => {
        return item.id == dishId;
      })[0];

      if (dish) {
        return dish;
      }
      return {};
    },
    recipeItems() {
      let list = [];
      let dishId = this.dish.id;
      this.$store.getters['recipes/getList'].forEach(element => {
        if (element.id == dishId) {
          if (element.ingredients) {
            element.ingredients.forEach((ingredient) => {
              let row = {
                id: element.id,
                ingredient: { id: ingredient.id, quantity: ingredient.quantity }
              }

              list.push(row);
            });
          }
        }
      });

      return list;
    }, ingredientsMap() {
      let iMap = new Map();
      this.loadIngredientsItems().forEach(item => {
        iMap.set(item.id, { ...item })
      })
      return iMap;
    },
    measurementsMap() {
      let iMap = new Map();
      this.$store.getters['measurements/getList'].map(item => {
        iMap.set(item.id, { ...item })
      })
      return iMap;
    }
  },
  methods: {
    loadIngredientsItems() {
      return this.$store.getters['ingredients/getList'].map(element => {
        return { ...element };
      });
    },
    addIngredientRecipe(payload) {
      this.$store.commit({
        type: 'recipes/addIngredient',
        ...payload
      })
    },
    updateRecipeIngredient(payload) {
      this.$store.commit({
        type: 'recipes/updateIngredient',
        ...payload
      })
    },
    deleteRecipeIngredient(payload) {
      this.$store.commit({
        type: 'recipes/removeIngredient',
        ...payload
      })
    },
    computeIngredientName(rowData) {
      const ingredient = this.ingredientsMap.get(rowData.ingredient.id);

      if (ingredient) {
        return ingredient.description;
      }

      return 'No name found';
    },
    computeQuantity(ingredient) {
      const fullIng = this.ingredientsMap.get(ingredient.id);
      const measurement = this.measurementsMap.get(fullIng.measurement.id);
      return `${ingredient.quantity} ${measurement.symbol}`;
    },
    showRecipeIngredientModal(ingredient, recipeIngredient) {
      const fullIngredient = this.ingredientsMap.get(ingredient.id);

      this.selectedRecipeIngredient = {
        id: recipeIngredient ? recipeIngredient.id : '',
        ingredient: {
          id: fullIngredient.id,
          description: fullIngredient.description,
          quantity: recipeIngredient ? parseInt(recipeIngredient.ingredient.quantity) : ''
        }
      }

      this.$refs.modalRecipeIngredient.show();
    },
    hideRecipeIngredientModal() {
      this.$refs.modalRecipeIngredient.hide();
    }, add() {
      this.selectedRecipeIngredient.id = this.dish.id;
      this.addIngredientRecipe(this.selectedRecipeIngredient);
      this.hideRecipeIngredientModal();
    }, update() {
      this.updateRecipeIngredient(this.selectedRecipeIngredient);
      this.hideRecipeIngredientModal();
    },
    editRow(rowData) {
      this.showRecipeIngredientModal(rowData.ingredient, rowData);
    },
    deleteRow(rowData) {
      this.deleteRecipeIngredient(rowData);
    },
    cancel() {
      this.$router.push('/platillos')
    }
  }
}
</script>
<style>

</style>
