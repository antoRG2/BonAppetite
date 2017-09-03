<template>
    <div>
        
        <div class="container">

            <div class="row">
                <div class="col-md-6 menu">
                    <div id="container"></div>
                </div>
                <div class="col-md-6 accounts-open">
                    <div class="actions-row">
                        <button type="button" v-on:click="showClientModal" class="btn btn-warning pull-right">Nuevo clientes</button>
                    </div>
                    <div class="tabs-container">
                        <vue-tabs v-on:tab-change="tabChanged">
                            <v-tab v-for="client in clients" :key="client">
                                <div slot="title">
                                    <inline-edit v-bind:text="client.name" v-on:changed="val => client.name = val"></inline-edit>
                                </div>

                                <div class="container-fluid orders-table">
                                    <div class="row orders-table-header">
                                        <div class="col-7">Orden</div>
                                        <div class="col-3 text-center">Cantidad</div>
                                        <div class="col-2"></div>
                                    </div>
                                    <div v-for="order in client.orders" :key="order" class="row orders-table-row">
                                        <div class="col-7">{{ order.value }}</div>
                                        <div class="col-3 text-center">x{{order.amount}} </div>
                                        <div class="col-2">
                                            <i class="icon-minus icons" v-on:click="actionOrder('minus',client, order)"></i>
                                            <i class="icon-plus icons" v-on:click="actionOrder('plus',client, order)"></i>
                                        </div>
                                    </div>
                                </div>
                            </v-tab>
                        </vue-tabs>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button type="button" id="payButton" class="btn btn-success" v-on:click="showBillModal">Pagar Factura</button>
            </div>
        </div>

        <!-- Agregar Cliente Modal-->

        <b-modal ref="addClientModal" id="addClientModal" title="Agregar Cliente" @ok="addClient" hide-footer="true">
            <form @submit.stop.prevent="submit">
                <div class="modal-body">
                    <form>
                        <div class="container">
                            <div class="row">
                                <div class="col-6">
                                    <input type="text" class="form-control" v-model="newClientName" minlength="1" required disable="true" placeholder="Nombre del cliente">
                                </div>
                                <div class="col-6">
                                    <button type="button" v-on:click="addClient(newClientName)" class="btn btn-success">Agregar</button>
                                </div>
                            </div>
                        </div>
                        <div class="container clients-detail-area">
                            <div class="client-row col-12" v-for="client in clients" :key="client">
                                {{client.name}}
                            </div>
                        </div>
                    </form>
                </div>
            </form>
        </b-modal>

        <!--Modal-->

        <!-- Paga factura Modal-->

        <b-modal ref="checkAccountModal" id="checkAccountModal" title="Pago de Factura" @ok="payBill" close-title="Cancelar" ok-title="Pagar">
            <form @submit.stop.prevent="submit">
                <div class="modal-body">
                    <form>
                        <input type="checkbox">Cliente 1<br>
                        <input type="checkbox">Cliente 2<br>
                        <input type="checkbox">Cliente 3<br>
                        <input type="checkbox">Cliente 4<br>
                    </form>
                </div>
            </form>
        </b-modal>

        <!--Modal-->
    </div>
</template>
<script>
import '../../vue-tabs/vue-tabs.js';
import '../../vue-tabs/vue-tabs.css';

import menuService from '../../menu/service/menu.service';
import ClientsService from '../../menu/service/clients.service';
import '../../menu/components/inline-edit.component';

export default {
    data() {
        return {
            message: 'Administración de menus',
            clients: [],
            clientsService: ClientsService.service,
            activeClient: {},
            activeTabIndex: -1,
            newClientName: ''
        }
    },
    created: function() {
        // application init
        this.clientsService.clients = this.clients;

        //create an initial client and set it as active
        this.activeClient = this.clientsService.createClient('Client 1');
        this.clientsService.activeClient = this.activeClient;
    },
    mounted: function() {
        var $self = this;

        let addOrderToClientCallback = function(_order) {
            if ($self.$data.activeClient && $self.$data.activeClient.orders) {
                $self.$data.clientsService.addOrderToClient($self.$data.activeClient, _order);
            } else {
                alert('There are no selected clients')
            }
        }

        // execute the menu-service init 
        menuService.gridInit(addOrderToClientCallback);

    },
    computed: {

    },
    components: {
    },
    methods: {
        tabChanged: function(activeTabIndex, newTab, oldTab) {
            this.activeTabIndex = activeTabIndex;
            this.activeClient = this.clients[activeTabIndex];
            this.clientsService.activeClient = this.activeClient;
        },
        actionOrder: function(action, client, order) {
            if (action == 'plus') {
                this.clientsService.addOrderToClient(client, order);
            } else if (action == 'minus') {
                this.clientsService.substractOrderToClient(client, order);
            }
        },
        showClientModal: function() {
            this.$root.$emit('show::modal', 'addClientModal');
        },
        showBillModal: function() {
            this.$root.$emit('show::modal', 'checkAccountModal');
        },
        addClient: function(_name) {
            let name = _name;

            this.$data.clientsService.createClient(_name);

            if (this.$data.clientsService.clients.length === 1) {
                this.$data.activeClient = this.$data.clients[0];
                this.$data.clientsService.activeClient = this.$data.activeClient;
            }
            this.$data.newClientName = '';
        }
    }
}

</script>
<style>

</style>

