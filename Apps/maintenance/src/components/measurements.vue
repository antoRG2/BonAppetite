<template>
  <div>
    {{message}}
    <!-- <b-table striped hover :items="items" :fields="fields">
                    </b-table> -->
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
    <b-button variant="success" size="sm" v-b-modal.modalCreate>
      Agregar Unidad de Medida
    </b-button>

    <b-modal ref="modalCreate" id="modalCreate" title="Crear Unidad de Medida" @ok="create" @shown="clearName" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Descripción" v-model="payload.description"></b-form-input>
        <b-form-input type="text" placeholder="Simbolo" v-model="payload.symbol"></b-form-input>
      </form>
    </b-modal>

    <b-modal ref="modalUpdate" id="modalUpdate" title="Editar Unidad de Medida" @ok="update" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Id" v-model="payload.id" readonly></b-form-input>
        <b-form-input type="text" placeholder="Descripción" v-model="payload.description"></b-form-input>
        <b-form-input type="text" placeholder="Simbolo" v-model="payload.symbol"></b-form-input>
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
        symbol: '',
        description: ''
      }
    }
  },
  computed: {
    message() {
      return this.$store.getters['measurements/getMessage'];
    },
    fields() {
      return ['id', 'description', 'symbol', 'actions']
    },
    items() {
      return this.$store.getters['measurements/getList'].map(element => {
        return { id: element.id, description: element.description, symbol: element.symbol };
      })
    }
  },
  methods: {
    addMeasurement(payload) {
      this.$store.commit({
        type: 'measurements/add',
        ...payload
      })
    },
    deleteMeasurement(payload) {
      this.$store.commit({
        type: 'measurements/delete',
        ...payload
      })
    },
    updateMeasurement(payload) {
      this.$store.commit({
        type: 'measurements/update',
        ...payload
      })
    },
    clearName() {
      this.payload = {
        id: '',
        symbol: '',
        description: ''
      }
    },
    create() {
      this.addMeasurement(this.payload);
    },
    editRow(_row) {
      this.payload = {
        ..._row
      };
      this.$refs.modalUpdate.show();
    },
    deleteRow(_row) {
      this.deleteMeasurement(_row);
    },
    update() {
      this.updateMeasurement(this.payload);
    }
  }
}
</script>
<style>

</style>
