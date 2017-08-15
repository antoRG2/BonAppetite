'use strict';

let ClientsService = function () {
    this.clients = [];
}

ClientsService.prototype.buildClient = function (_name) {

    let _client = {
            id: this.clients.length + 1,
            name: _name,
            orders: []
        };

    return _client;
}

ClientsService.prototype.addClient = function ( _client ) {
    this.clients.push( _client );
}

ClientsService.prototype.createClient = function( _name ) {
    this.addClient( this.buildClient( _name ) );
}


let service = new ClientsService();

export default { service };

