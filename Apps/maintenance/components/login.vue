<template>
    <div>
        {{message}}
        <b-form @submit="onSubmit" >
            <b-form-group id="userName" label="Ingresa tu usuario:" label-for="userName">
                <b-form-input id="userName" type="input" v-model="form.userName" required placeholder=""></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Ingresa tu contraseña:" label-for="password">
                <b-form-input id="password" type="password" v-model="form.password" required placeholder=""></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Ingresar</b-button>
            <b-button type="reset" variant="secondary">Cancelar</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            message: 'Login',
            form: {
                userName: '',
                password: ''
            }
        }
    },
    methods: {
        login: function(user, password) {
            this.form.userName = '';
            this.form.password = '';
            this.$router.app.$emit('login:access', user, password);
        },
        onSubmit: function(event) {
            event.preventDefault();
            this.login(this.form.userName, this.form.password);
        }
    }
}
</script>
<style>
.login-form {
    width: 400px;
    height: 400px;
}
</style>
