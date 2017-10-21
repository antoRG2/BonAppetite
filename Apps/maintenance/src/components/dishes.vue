<template>
  <div>
    Platillos
    <v-client-table ref="vuetable" :api-mode="false" :data="dishesList" :columns="fields" :options="options" data-path="data" pagination-path="">
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
      <template slot="category" scope="props">
        <div>
          {{categoryFormatter(props.row.category)}}
        </div>
      </template>
      <template slot="h__id" scope="props">
        Identificador
      </template>
      <template slot="h__name" scope="props">
        Nombre
      </template>
      <template slot="h__price" scope="props">
        Precio
      </template>
      <template slot="h__category" scope="props">
        Categoria
      </template>
      <template slot="h__actions" scope="props">
        
      </template>
    </v-client-table>

    <b-button variant="success" size="sm" v-b-modal.modalCreate>
      <i class="icon-plus icons"></i> Agregar</button>
    </b-button>

    <b-modal ref="modalCreate" id="modalCreate" title="Crear Platillo" @ok="submit" @shown="clearData" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Nombre" v-model="dish.name"></b-form-input>
        <br>
        <b-form-input type="number" placeholder="Precio" v-model="dish.price"></b-form-input>
        <br>
        <b-form-select v-model="dish.category.id" :options="localCategories">
        </b-form-select>
      </form>
    </b-modal>

    <b-modal ref="modalUpdate" id="modalUpdate" title="Actualizar Platillo" @ok="update" close-title="Cerrar">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Nombre" v-model="dish.name"></b-form-input>
        <br>
        <b-form-input type="number" placeholder="Precio" v-model="dish.price"></b-form-input>
        <br>
        <b-form-select v-model="dish.category.id" :options="localCategories">
        </b-form-select>
      </form>
      <div slot="modal-footer" class="w-100 footer-buttons">

        <b-button size="sm" variant="warning" @click="editRecipe">
          Editar Receta
        </b-button>
        <b-button size="sm" variant="primary" @click="update">
          Actualizar
        </b-button>
        <b-button size="sm" variant="danger" @click="hideUpdateModal">
          Cancel
        </b-button>

      </div>
    </b-modal>
  </div>
</template>
<script>
import { ClientTable, Event } from 'vue-tables-2';

export default {
  props: [],
  data() {
    return {
      fields: [
        'id', 'name', 'price', 'category', 'actions'],
      dish: {
        name: '',
        price: '',
        category: {
          id: ''
        }
      },
      selectedRowData: {},
      selectedCategory: null,
      options: {

      }
    }
  },
  computed: {
    dishesList() {
      return this.$store.getters['dishes/getList'].map(element => {
        return { ...element };
      })
    },
    localCategories() {
      return this.categories.map(element => {
        return {
          value: element.id,
          text: element.name
        };
      })
    },
    categories() {
      return this.$store.getters['categories/getList'].map(element => {
        return {
          ...element
        };
      })
    }
  },
  components: {
    ClientTable
  },
  methods: {
    categoryFormatter: function(value) {
      if (value) {
        let result = this.categories.filter(c => {
          return c.id == value.id;
        })[0];
        return result.name;
      } else {
        return ''
      }

    },
    editRow(rowData) {
      let dish = {
        id: rowData.id,
        name: rowData.name,
        price: rowData.price,
        category: {
          id: rowData.category.id
        }
      };
      this.dish = dish;
      this.$refs.modalUpdate.show();
    },
    deleteRow(rowData) {
      this.$store.commit({
        type: 'dishes/delete',
        ...rowData
      })
    },
    clearData() {
      this.dish = {
        name: '',
        price: '',
        category: {
          id: ''
        }
      }
    },
    update() {
      this.$store.commit({
        type: 'dishes/update',
        ...this.dish
      });
      this.hideUpdateModal();
    },
    submit(e) {
      if (!this.dish.name || !this.dish.price || !this.dish.category.id) {
        alert('Por favor ingrese todos los campos');
        return e.cancel();
      }

      this.$store.commit({
        type: 'dishes/add',
        ...this.dish
      })
    },
    editRecipe() {
      this.$router.push(`/recetas/${this.dish.id}`);
    },
    hideUpdateModal() {
      this.$refs.modalUpdate.hide();
    }
  }
}
</script>
<style>
.footer-buttons {
  text-align: right;
}
</style>
