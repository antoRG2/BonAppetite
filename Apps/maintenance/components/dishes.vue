<template>
    <div>
        Platillos
        <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" data-path="data" pagination-path="">
            <template slot="actions" scope="props">
                <div class="table-button-container">
                    <b-button variant="success" size="sm" @click="editRow(props.rowData)">
                        <i class="icon-pencil icons"></i>
                        </button>
                    </b-button>

                    <b-button variant="danger" size="sm" @click="deleteRow(props.rowData)">
                        <i class="icon-ban icons"></i>
                        </button>
                    </b-button>
                </div>
            </template>
        </vuetable>

        <b-button variant="success" size="sm" v-b-modal.modalCreate>
            <i class="icon-plus icons"></i> Agregar</button>
        </b-button>

        <b-modal ref="modalCreate" id="modalCreate" title="Crear Platillo" @ok="submit" @shown="clearData" close-title="Cerrar">
            <form @submit.stop.prevent="submit">
                <b-form-input type="text" placeholder="Nombre" v-model="dish.name"></b-form-input>
                <br>
                <b-form-input type="number" placeholder="Precio" v-model="dish.price"></b-form-input>
                <br>
                <b-form-select v-model="selectedCategory" :options="localCategories" plain="true">
                </b-form-select>
            </form>
        </b-modal>

        <b-modal ref="modalUpdate" id="modalUpdate" title="Actualizar Platillo" @ok="update" close-title="Cerrar">
            <form @submit.stop.prevent="submit">
                <b-form-input type="text" placeholder="Nombre" v-model="dish.name"></b-form-input>
                <br>
                <b-form-input type="number" placeholder="Precio" v-model="dish.price"></b-form-input>
                <br>
                <b-form-select v-model="selectedCategory" :options="localCategories" plain="true">
                </b-form-select>
            </form>
        </b-modal>
    </div>
</template>
<script>
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';

export default {
    props: ['categories', 'dishes'],
    data() {

        let categoriesOptions = [];
        categoriesOptions.push({ value: null, text: 'Seleccione una categoria', disabled: true });

        this.categories.data.map(c => {
            let co = {
                value: c.id,
                text: c.name
            }

            categoriesOptions.push(co);
        });

        return {
            fields: [{ name: 'id', title: '' },
            { name: 'name', title: 'Nombre' },
            { name: 'price', title: 'Precio' },
            { name: 'category.id', title: 'Categoria', callback: 'categoryFormatter' }
                , '__slot:actions'],
            localData: this.dishes.data,
            localCategories: categoriesOptions,
            dish: {
                name: '',
                price: '',
                category: {}
            },
            selectedRowData: {},
            selectedCategory: null
        }
    },
    computed: {
        /*httpOptions(){
            return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
        },*/
    },
    components: {
        Vuetable
    },
    methods: {
        categoryFormatter: function(value) {
            let result = this.categories.data.filter(c => {
                return c.id == value;
            })[0];
            return result.name;
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
            this.selectedCategory = rowData.category.id;
            this.$refs.modalUpdate.show();
        },
        deleteRow(rowData) {
            let index = this.localData.indexOf(rowData);
            this.localData.splice(index, 1);
        },
        clearData() {
            this.dish.price = '';
            this.dish.name = '';
            this.category = {};
            this.selectedCategory = null;
        },
        update() {
            let result = this.localData.filter(data => {
                return data.id == this.dish.id;
            })[0];

            result.name = this.dish.name;
            result.price = this.dish.price;
            result.category.id = this.selectedCategory;
        },
        submit(e) {
            if (!this.dish.name || !this.dish.price || !this.selectedCategory) {
                alert('Por favor ingrese todos los campos');
                return e.cancel();
            }

            let id = Math.max(...this.localData.map(v => parseInt(v.id))) || 0;
            let dish = {
                id: id + 1,
                name: this.dish.name,
                price: this.dish.price,
                category: {
                    id: this.selectedCategory
                }
            }
            this.localData.push(Object.assign(dish));

            this.dish.name = '';
            this.dish.price = '';
            this.dish.category = {};
        }
    }
}
</script>
<style>

</style>
