import './vue-tabs/vue-tabs.js';
import './vue-tabs/vue-tabs.css';
import './menu/styles/menu.css';

import menuService from './menu/service/menu.service';
import ClientsService from './menu/service/clients.service';


$(document).ready(function () {

    let _data = {
        clients: [],
        clientsService: ClientsService.service,
        activeClient: {},
        activeTabIndex: -1
    };


    var app = new Vue({
        el: '#app',
        data: _data,
        created: function () {
            // application init
            this.clientsService.clients = this.clients;
            
            //create an initial client and set it as active
            this.activeClient = this.clientsService.createClient('Client 1');
            this.clientsService.activeClient = this.activeClient;
        },
        methods: {
            tabChanged: function( activeTabIndex, newTab, oldTab ) {
                this.activeTabIndex = activeTabIndex;
                this.activeClient = this.clients[activeTabIndex];
                this.clientsService.activeClient = this.activeClient;
            }
        }
    })

    let addOrderToClientCallback = function( _order ) {
        if( app.$data.activeClient && app.$data.activeClient.orders ) {
            app.$data.clientsService.addOrderToClient( app.$data.activeClient, _order );
        } else {
            alert('There are no selected clients')
        }
    }


    // execute the menu-service init 
    menuService.gridInit( addOrderToClientCallback );
    //

    $('#addClient').on("click", function () {
        //abre modal
        $("#clientModal").modal();
    });

    $('#backMenu').on("click", function () {
        window.location = "../Views/salon.html";
    });

    $('#saveClient').on("click", function (e) {
        e.preventDefault();
        let _name = $('#nombreCliente').val();
        app.$data.clientsService.createClient(_name);

        if(app.$data.clientsService.clients.length === 1) {
            app.$data.activeClient = app.$data.clients[0];
            app.$data.clientsService.activeClient = app.$data.activeClient;
        }
        $('#nombreCliente').val('');
        // $('#clientModal').modal('toggle');
    });

    function loadClients(client) {
        $(this).closest('li').before('<li><a>New Tab</a><span>x</span></li>');
        $('#clients').append('<div class="tab-pane">new tab</div>');
    }

    function saveClientsDB(clientsList) {
        //Aqui va el ajax que guarda los clientes en DB
    }

    function loadCategories() {
        //ajax que carga categorias
    }

    function loadProducts(idCategory) {
        //ajax que carga productos
        debugger;
        var container = document.getElementById("container");
        var groups = container.getElementsByTagName("g");
        container.removeChild(groups);
        container.appendChild(grid(productos, 15, 200, ["white", "green"]));
    }

    $('#payButton').on("click", function () {
        //abre modal
        $("#pagoFacturaModal").modal();
    });
});