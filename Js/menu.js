$(document).ready(function () {
    var clients = [];
    var clientsOrders = [];

    //TODO: esta lista deberia ser una lista de objetos con el nombre y el id de la categoria
    var categorias = ["carnes", "arroz", "ensaladas", "entradas", "postres"]
    var productos = ["tiramisu", "brownie", "helado", "pastel"]
    var alter = [
        {
            id: '1', value: 'carnes', children: [
                { id: '12', value: 'hamburguesa' },
                { id: '13', value: 'filet' },
                { id: '14', value: 'pescado' },
                { id: '15', value: 'pollo' }
            ]
        },
        {
            id: '2', value: 'arroz', children: [
                { id: '22', value: 'arroz frito' },
                { id: '23', value: 'arroz con coco' },
                { id: '24', value: 'chino' },
                { id: '25', value: 'arroz y salsa' }
            ]
        },
        { id: '3', value: 'ensaladas' },
        { id: '4', value: 'entradas' },
        { id: '5', value: 'postres' }
    ];

    var grid = new MenuGrid(3, 4, alter);

    grid.rowsDef = {
        autoRows: true,
        height: 'auto'
    };

    // si los items enviados no son texto o numero hay que crear un dataformatter
    grid.itemsDef.dataFormatter = function (item) {
        // este formater es exclusivo para los objetos de alter
        return item.value;
    }

    // evento que se ejecuta cuando uno de los divs internos recibe un click
    grid.columnsDef.itemsCallback = (function (event, item) {
        console.log('Item clicked', event, item, this.items);
        // // TODO
        // clear the grid
        // recreate children

    }).bind(grid);

    grid.actionsDef = [{
        value: 'Atras',
        action: function () {
            console.log('Atras happened');
        }
    }];

    // si create no tiene parametros usa la configuracion por defecto
    var gridElement = grid.create();
    grid.toString();

    
    var container = document.getElementById("container");
    container.appendChild(gridElement);

    //
    

    $('#addClient').on("click", function () {
        //abre modal
        $("#clientModal").modal();
    });

    $('#backMenu').on("click", function () {
        window.location = "../Views/salon.html";
    });

    $('#saveClient').on("click", function () {
        debugger;
        clients.push($('#nombreCliente').val());
        loadClients($('#nombreCliente').val());
        saveClientsDB(clients);
        $('#clientModal').modal('toggle');
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

    $('#clients li').on("click", function () {
        $('#clients li').find('.active').removeClass('active');
        $(this).find('a').addClass('active');
    });

    $('#payButton').on("click", function () {
        //abre modal
        $("#pagoFacturaModal").modal();
    });
});