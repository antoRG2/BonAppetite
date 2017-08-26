Vue.component('inline-edit', {
    props: [
        'text'
    ],
    template: `
            <div>
                <span v-if="!editVisible">
                    {{text}}
                    <span v-on:click="editVisible = true">&#9998;</span>
                </span>
                <div v-if="editVisible">
                    <input type="text" v-model="text">
                    <span v-on:click="updateText()">&#10004;</span>
                </div>
            </div>
        `,
    data: function () {
        return {
            editVisible: false
        }
    },
    methods: {
        updateText: function () {
            this.editVisible = false;
            this.$emit('changed', this.text);
        }
    }
});