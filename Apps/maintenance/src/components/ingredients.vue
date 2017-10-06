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
      <template slot="measurement" scope="props">
        <div>
          {{computeMeasurement(props ? props.row : '')}}
        </div>
      </template>
    </v-client-table>
    <b-button variant="success" size="sm" v-b-modal.modalCreate>
      Agregar Ingrediente
    </b-button>

    <b-modal ref="modalCreate" id="modalCreate" title="Crear Ingrediente" @ok="create" @shown="clearName" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Descripción" v-model="payload.description"></b-form-input>
        <b-form-select v-model="payload.measurement.id" :options="measurementsList">
        </b-form-select>
      </form>
    </b-modal>

    <b-modal ref="modalUpdate" id="modalUpdate" title="Editar Ingrediente" @ok="update" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Id" v-model="payload.id" readonly></b-form-input>
        <b-form-input type="text" placeholder="Descripción" v-model="payload.description"></b-form-input>
        <b-form-select v-model="payload.measurement.id" :options="measurementsList">
        </b-form-select>
      </form>
    </b-modal>

  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      options: {

      },
      payload: {
        id: '',
        description: '',
        measurement: {
          id: ''
        }
      }
    }
  },
  computed: {
    message() {
      return this.$store.getters['ingredients/getMessage'];
    },
    fields() {
      return ['id', 'description', 'measurement', 'actions']
    },
    items() {
      return this.$store.getters['ingredients/getList'].map(element => {

        return { ...element };
      })
    },
    measurementsList() {
      return this.$store.getters['measurements/getList'].map(element => {
        const option = { value: element.id, text: `${element.description}/${element.symbol}` };
        return option;
      })
    }
  },
  methods: {
    addIngredient(payload) {
      this.$store.commit({
        type: 'ingredients/add',
        ...payload
      })
    },
    deleteIngredient(payload) {
      this.$store.commit({
        type: 'ingredients/delete',
        ...payload
      })
    },
    updateIngredient(payload) {
      this.$store.commit({
        type: 'ingredients/update',
        ...payload
      })
    },
    clearName() {
      this.payload = {
        id: '',
        description: '',
        measurement: {
          id: ''
        }
      };
    },
    create() {
      this.addIngredient(this.payload);
    },
    editRow(_row) {
      this.payload = {
        ..._row
      };
      this.$refs.modalUpdate.show();
    },
    deleteRow(_row) {
      this.deleteIngredient(_row);
    },
    update() {
      this.updateIngredient(this.payload);
    },
    computeMeasurement(_row) {
      if (_row && this.measurementsList) {
        return this.measurementsList.find( element => {
          return element.value == _row.measurement.id;
        }).text;
      }
    }
  }
}
</script>
<style>

</style>
