<template>
  <div>
    Categorias
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
      <template slot="h__id" scope="props">
        Identificador
      </template>
      <template slot="h__name" scope="props">
        Nombre
      </template>
      <template slot="h__actions" scope="props">
        
      </template>
    </v-client-table>
    <b-button variant="success" size="sm" v-b-modal.modalCreate>
      <i class="icon-plus icons"></i> Agregar</button>
    </b-button>

    <b-modal ref="modalCreate" id="modalCreate" title="Crear Categoria" @ok="submit" @shown="clearName" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Nombre" v-model="payload.name"></b-form-input>
      </form>
    </b-modal>

    <b-modal ref="modalUpdate" id="modalUpdate" title="Actualizar Categoria" @ok="update" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Nombre" v-model="payload.name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { ClientTable, Event } from 'vue-tables-2';

export default {
  props: [],
  data: function() {
    return {
      fields: ['id', 'name', 'actions'],
      payload: {
        id:'',
        name: ''
      },
      options: {

      }
    }
  },
  computed: {
    items() {
      return this.$store.getters['categories/getList'].map(element => {
        return { ...element };
      })
    }
  },
  components: {
    ClientTable
  },
  methods: {
    addCategory(payload) {
      this.$store.commit({
        type: 'categories/add',
        ...payload
      })
    },
    updateCategory(payload) {
      this.$store.commit({
        type: 'categories/update',
        ...payload
      })
    },
    deleteCategory(payload) {
      this.$store.commit({
        type: 'categories/delete',
        ...payload
      })
    },
    editRow(rowData) {
      this.payload = {
        ...rowData
      }
      this.$refs.modalUpdate.show();
    },
    deleteRow(rowData) {
      this.deleteCategory(rowData);
    },
    clearName() {
      this.payload = {
        id:'',
        name: ''
      };
    },
    update() {
      this.updateCategory(this.payload);
    },
    submit(e) {
      if (!this.payload || !this.payload.name) {
        alert('Por favor ingrese el nombres');
        return e.cancel();
      }
      this.addCategory(this.payload);
      this.clearName();
    }
  }
}
</script>
<style>

</style>
