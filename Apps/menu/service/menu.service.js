const MenuGrid = require('../menu-grid/menu-grid.js');

function gridInit( _addOrderCallback ) {
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

    var grid = new MenuGrid.MenuGridComponent(3, 4, alter);

    grid.rowsDef = {
        autoRows: true,
        height: 'auto',
        minmax: '80px'
    };

    // si los items enviados no son texto o numero hay que crear un dataformatter
    grid.itemsDef.dataFormatter = function (item) {
        // este formater es exclusivo para los objetos de alter
        return item.value;
    }

    // evento que se ejecuta cuando uno de los divs internos recibe un click
    grid.columnsDef.itemsCallback = (function (event, item) {
        if (item.children) {
            this.updateContent(item.children);
        } else { // no children
            // TODO: Make this return callback to decouple logic
            if(_addOrderCallback) {
                _addOrderCallback( item );
            } else {
                alert('no active client');
            }
        }
    }).bind(grid);

    grid.actionsDef = [{
        value: 'Atras',
        action: function () {
            grid.updateContent(alter);
        }
    }];

    // si create no tiene parametros usa la configuracion por defecto
    var gridElement = grid.create();
    grid.toString();


    var container = document.getElementById("container");
    container.appendChild(gridElement);

    //

    return grid;
}

export default { gridInit: gridInit };