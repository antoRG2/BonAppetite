<template>
    <div>
        Categorias
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
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';

export default {
    props: ['categories'],
    data: function() {
        return {
            fields: ['id', 'name', '__slot:actions'],
            localData: this.categories.data,
            name: '',
            selectedRowData: {}
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
        editRow(rowData) {
            console.log(rowData.name);
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
