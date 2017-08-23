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

ClientsService.prototype.addClient = function (_client) {
    this.clients.push(_client);
}

ClientsService.prototype.createClient = function (_name) {
    let client = this.buildClient(_name);
    this.addClient(client);
    return client;
}

ClientsService.prototype.addOrderToClient = function (_client, _order) {
    let found = _client.orders.filter(order => {
        return order.id == _order.id;
    });

    if (found.length > 0) {
        found[0].amount = found[0].amount + 1;
    } else {
        _order.amount = 1;
        _client.orders.push(_order);
    }
}


let service = new ClientsService();

export default { service };

