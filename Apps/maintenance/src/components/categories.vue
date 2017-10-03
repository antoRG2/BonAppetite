<template>
    <div>
        Categorias
        <v-client-table ref="vuetable" :api-mode="false" :data="localData" :columns="fields" :options="options" data-path="data" pagination-path="">
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
            <i class="icon-plus icons"></i> Agregar</button>
        </b-button>

        <b-modal ref="modalCreate" id="modalCreate" title="Crear Categoria" @ok="submit" @shown="clearName" close-title="Cerrar">
            <form @submit.stop.prevent="submit">
                <b-form-input type="text" placeholder="Nombre" v-model="name"></b-form-input>
            </form>
        </b-modal>

        <b-modal ref="modalUpdate" id="modalUpdate" title="Actualizar Categoria" @ok="update" close-title="Cerrar">
            <form @submit.stop.prevent="submit">
                <b-form-input type="text" placeholder="Nombre" v-model="name"></b-form-input>
            </form>
        </b-modal>
    </div>
</template>
<script>
import {ClientTable, Event} from 'vue-tables-2';

export default {
    props: ['categories'],
    data: function() {
        return {
            fields: ['id', 'name', 'actions'],
            localData: this.categories.data,
            name: '',
            selectedRowData: {},
            options: {

            }
        }
    },
    computed: {
        /*httpOptions(){
            return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
        },*/

    },
    components: {
        ClientTable
    },
    methods: {
        editRow(rowData) {
            this.name = rowData.name;
            this.selectedRowData = rowData;
            this.$refs.modalUpdate.show();
        },
        deleteRow(rowData) {
            let index = this.localData.indexOf(rowData);
            this.localData.splice(index, 1);
        },
        clearName() {
            this.name = '';
        },
        update() {
            this.selectedRowData.name = this.name;
        },
        submit(e) {
            if (!this.name) {
                alert('Por favor ingrese el nombres');
                return e.cancel();
            }

            let id = Math.max(...this.localData.map(v => parseInt(v.id))) || 0;
            this.localData.push({ id: id + 1, name: this.name })
            this.name = '';
            this.$emit('create-category', this.locaData);
            this.$router.app.$emit('create-category')
        }
    }
}
</script>
<style>

</style>
