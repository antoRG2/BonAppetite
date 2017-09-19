<template>
    <div class="menu-section">
        <div class="container" v-show="selectedTable.tableNumber">
            <h4 class="text-right">
                <b-badge pill variant="success">Mesa #{{selectedTable.tableNumber}}</b-badge>
            </h4>
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

        <b-alert variant="warning" show v-if="message">
            {{message}}
        </b-alert>

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
                                    <button type="button" v-on:click="addClient" class="btn btn-success">Agregar</button>
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
                        <div id="clientsCheckboxed" class="custom-controls-stacked">
                            <b-form-checkbox v-for="client in clients" v-model="billSelected" :key="client" name="client-bill-checks" :value="client.id">
                                {{client.name}}
                            </b-form-checkbox>
                        </div>
                        <b-alert variant="warning" show v-if="billFeedback">
                            {{billFeedback}}
                        </b-alert>
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
    props: ['tables', 'dishes', 'categories'],
    data() {
        return {
            message: '',
            clients: [],
            clientsService: ClientsService.service,
            activeClient: {},
            activeTabIndex: -1,
            newClientName: '',
            selectedTable: {},
            billSelected: [],
            billFeedback: ''
        }
    },
    created: function() {

    },
    mounted: function() {
        const tableNumber = this.$route.params.id;
        if (tableNumber) {
            const table = this.getTableByNumber(tableNumber);
            if (table) {
                this.selectedTable = table;
                this.message = '';
                let clients = this.buildTableClients(table);
                this.initMenuGrid(this.computedCategories);
            } else {
                this.message = `Mesa número ${tableNumber} no existe.`;
            }
        } else {
            this.message = 'Por favor seleccione un numero de mesa en la pagina del salón.';
        }
    },
    computed: {
        computedCategories: function() {
            let root = this.categories.data.map((_cat) => {

                let _children = this.dishes.data.filter(_d => {
                    return _d.category.id == _cat.id;
                }).map(_d => {
                    return {
                        id: _d.id,
                        value: _d.name
                    }
                });

                return {
                    id: _cat.id,
                    value: _cat.name,
                    children: _children
                }
            });

            console.log('root', root);

            return root;
        }
    },
    components: {
    },
    watch: {
        billSelected(newVal, oldVal) {
            console.log('bill selected', newVal);
            if (newVal.length === 0) {
                this.billFeedback = 'Seleccione almenos un cliente para generar factura';
            } else {
                this.billFeedback = '';
            }
        }
    }
    ,
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
        }, buildTableClients: function(table) {
            if (table) {
                // application init
                if (!table.clients) {
                    table.clients = [];
                }

                this.clients = table.clients;
                this.clientsService.clients = this.clients;

                // sets the active client
                if (this.clients.length === 0) {
                    this.activeClient = this.clientsService.createClient('Client 1');
                } else {
                    this.activeClient = this.clients[0];
                }

                this.clientsService.activeClient = this.activeClient;
            }

            return this.clientsService.clients;
        },
        showClientModal: function() {
            this.$root.$emit('show::modal', 'addClientModal');
        },
        showBillModal: function() {
            this.$root.$emit('show::modal', 'checkAccountModal');
        },
        addClient: function(event) {
            if (this.newClientName) {
                let name = this.newClientName;

                this.$data.clientsService.createClient(name);

                if (this.$data.clientsService.clients.length === 1) {
                    this.$data.activeClient = this.$data.clients[0];
                    this.$data.clientsService.activeClient = this.$data.activeClient;
                }
                this.$data.newClientName = '';
            } else {
                alert('Por favor ingrese un nombre valido');
            }
        },
        getTableByNumber: function(_tableNumber) {
            let table;
            if (_tableNumber) {
                if (this.tables) {
                    table = this.tables.filter((t) => {
                        return t.tableNumber === _tableNumber;
                    })[0];
                }
            }
            return table;
        },
        initMenuGrid: function(_computedCategories) {
            const _self = this;

            let addOrderToClientCallback = function(_order) {
                if (_self.$data.activeClient && _self.$data.activeClient.orders) {
                    _self.$data.clientsService.addOrderToClient(_self.$data.activeClient, _order);
                } else {
                    alert('There are no selected clients')
                }
            }

            // execute the menu-service init 
            menuService.gridInit(addOrderToClientCallback, _computedCategories);
        }
    }
}

</script>
<style>
.menu-section .alert {
    margin-top: 1rem;
}
</style>

