'use strict';


let ClientsService = function () {
    this.clients = [];
}

ClientsService.prototype.createClient = function (_name) {
    return {
        name: _name,
        orders: []
    }
}

ClientsService.prototype.addClient = function (_client) {
    this.clients.push(_client);
}

export default { ClientsService };

