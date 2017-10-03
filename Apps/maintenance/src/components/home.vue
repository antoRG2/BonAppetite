<template>
    <div>
        {{message}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: 'Bienvenido al mantenimiento del restaurante',
        }
    },
    computed: {
        /*httpOptions(){
            return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
        },*/
    },
    components: {
    },
    methods: {
     
    }
}
</script>
<style>

</style>
