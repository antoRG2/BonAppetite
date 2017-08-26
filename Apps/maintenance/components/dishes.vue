<template>
    <div>
        Platillos
        <vuetable ref="vuetable" api-url="../api/dishes.json" :fields="fields" data-path="data"
      pagination-path="">
            <template slot="actions" scope="props">
                <div class="table-button-container">
                    <button class="ui button" @click="editRow(props.rowData)">
                        <i class="fa fa-edit"></i> Edit</button>&nbsp;&nbsp;
                    <button class="ui basic red button" @click="deleteRow(props.rowData)">
                        <i class="fa fa-remove"></i> Delete</button>&nbsp;&nbsp;
                </div>
            </template>
        </vuetable>
    </div>
</template>
<script>
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';

export default {
    data() {
        return {
            fields: ['id', 'name','price','category.id','__slot:actions']
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
            alert("You clicked edit on" + JSON.stringify(rowData))
        },
        deleteRow(rowData) {
            alert("You clicked delete on" + JSON.stringify(rowData))
        }
    }
}
</script>
<style>

</style>
