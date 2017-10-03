import { MenuGridComponent } from './menu-grid.js';

function gridInit(_addOrderCallback, categoriesData) {
  let alter = categoriesData;

  var grid = new MenuGridComponent(3, 4, alter);

  grid.rowsDef = {
    autoRows: true,
    height: 'auto',
    minmax: '80px'
  };

  // si los items enviados no son texto o numero hay que crear un dataformatter
  grid.itemsDef.dataFormatter = function (item) {
    // este formater es exclusivo para los objetos de alter
    return item.value;
  };

  // evento que se ejecuta cuando uno de los divs internos recibe un click
  grid.columnsDef.itemsCallback = (function (event, item) {
    if (item.children) {
      this.updateContent(item.children);
    } else { // no children
        // TODO: Make this return callback to decouple logic
      if (_addOrderCallback) {
        _addOrderCallback(item);
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
  grid.updateContent(alter);
  
  var container = document.getElementById('container');
  container.appendChild(gridElement);

  return grid;
}

export default {
  gridInit: gridInit
};
