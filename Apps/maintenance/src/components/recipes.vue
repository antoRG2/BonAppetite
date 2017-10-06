<template>
  <div>
    {{message}}
    <v-client-table ref="vuetable" :api-mode="false" :data="items" :columns="fields" :options="options" data-path="data" pagination-path="">
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
    <b-button variant="success" size="sm" @click="newIngredient">
      Agregar Receta
    </b-button>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      options: {

      }
    }
  },
  computed: {
    message() {
      return this.$store.getters['recipes/getMessage'];
    },
    fields() {
      return ['id', 'description', 'actions']
    },
    items() {
      return this.$store.getters['recipes/getList'].map(element => {
        return { id: element.id, description: element.description };
      })
    }
  },
  methods: {
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
