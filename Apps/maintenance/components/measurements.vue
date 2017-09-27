<template>
    <div>
        {{message}}
        <b-table striped hover :items="items" :fields="fields">
        </b-table>
        <b-button variant="success" size="sm" @click="newIngredient">
            Agregar Ingrediente
        </b-button>
    </div>
</template>
<script>
export default {
    props: [],
    data() {
        return {
        }
    },
    computed: {
        message() {
            console.log(this, this.$store, this.$store.state.measurements.message);
            return this.$store.getters['measurements/getMessage'];
        },
        fields() {
            return [
                { key: 'id', label: 'Id' },
                { key: 'description', label: 'Descripción' }
            ]
        },
        items() {
            return this.$store.getters['measurements/getList'].map(element => {
                return { id: element.id, description: element.description };
            })
        }
    },
    methods: {
        newIngredient($event) {
            this.$store.commit({
                type: 'measurements/add',
                description: Date.now().toString()
            })
        },
    }
}
</script>
<style>

</style>
