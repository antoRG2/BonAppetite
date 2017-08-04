function MenuGrid(columns, rows, items) {
    this.columns = columns;
    this.rows = rows;
    this.items = items;
    this.itemsDef = {
        dataFormatter: function (item) {
            if (typeof (item) === 'string' || typeof (item) === 'number') {
                return item;
            }
        }
    };
    this.rowsDef = {
        autoRows: false,
        height: 'auto'
    };
    this.columnsDef = {
        width: 'auto'
    }

    this.defaultProps = {
        columns: 1,
        rows: 0,
        rowsDef: {
            autoRows: false,
            height: 'auto'
        },
        columnsDef: {
            width: 'auto'
        }
    }
}

MenuGrid.prototype.create = function (gridConfiguration) {
    let gConf = gridConfiguration || this.defaultProps;

    if (!gridConfiguration) {
        gConf.columns = this.columns || this.defaultProps.columns;
        gConf.rows = this.rows || this.defaultProps.rows;
        gConf.rowsDef = this.rowsDef || this.defaultProps.rowsDef;
    }

    let grid = {
        columns: gConf.columns || this.columns,
        rows: gConf.rows || this.rows,
        items: gConf.items || this.items || [],
        rowsDef: gConf.rowsDef || this.defaultProps.rowsDef,
        columnsDef: gConf.columnsDef || this.defaultProps.columnsDef,
        actionsDef: gConf.actionsDef || this.actionsDef
    }

    // the grid needs to be draw with the information from the 
    // items with the specied number of rows and columns

    // the grid most have an actions sections, initially with back button
    // 

    // when an item is clicked it needs to execute the selection input callback
    // with input parameters of the clicked item and the DOM element 
    //

    let dom = this.generateDom(grid);

    return dom;
}

MenuGrid.prototype.valueFormatterCallback = function (item) {
    if (this.itemsDef && this.itemsDef.dataFormatter) {
        return this.itemsDef.dataFormatter(item);
    } else {
        return item;
    }
}

MenuGrid.prototype.generateDom = function (gridConfiguration) {
    let cols = gridConfiguration.columns;
    let rows = gridConfiguration.rows;

    let grid = document.createElement('div');
    grid.classList.add('grid-container');
    let styles = `
        display: grid;
        grid-template-columns: repeat(${cols}, 1fr);
        grid-gap: 10px;
    `
    if (gridConfiguration.rowsDef.autoRows) {
        styles += 'grid-auto-rows: minmax(100px, auto);'
    } else {
        styles += `grid-template-rows: repeat(${rows}, 1fr);`
    }

    if (gridConfiguration.items) {
        gridConfiguration.items.forEach((element) => {
            let gItem = document.createElement('div');
            gItem.setAttribute('clickable', 'true');
            gItem.data = element;
            gItem.classList.add(['grid-cell']);
            if (this.valueFormatterCallback) {
                gItem.innerText = this.valueFormatterCallback(element);
            }

            grid.appendChild(gItem);
        });
    }

    let actionsRow = document.createElement('div');
    actionsRow.setAttribute('style','grid-column: 1 / last ;grid-row: last-line;');
    actionsRow.classList.add(['actions-row']);
    let actions = gridConfiguration.actionsDef;
    
    if (actions && actions.length) {
        actions.forEach((action) => {
            let gItem = document.createElement('div');
            gItem.data = action;
            gItem.classList.add(['action-cell']);
            gItem.innerText = action.value;
            gItem.addEventListener('click', function() {
                action.action();
            });            

            actionsRow.appendChild(gItem);
        });

        grid.appendChild( actionsRow) ;
    }

    grid.setAttribute('style', styles);

    // event listeners
    grid.addEventListener('click', (event) => {
        if (event.target && event.target.hasAttribute('clickable')) {
            if (typeof (this.itemsCallback) === 'function') {
                this.itemsCallback(event, event.target.data);
            }
        }
    }, true);


    return grid;
}


MenuGrid.prototype.itemsCallback = function () {
    if (this.columnsDef && typeof (this.columnsDef.itemsCallback) === 'function') {
        this.columnsDef.itemsCallback(event, event.target.data);
    }
}


MenuGrid.prototype.toString = function () {
    console.log(`
        columns: ${this.columns}
        rows: ${this.rows}
        items: ${this.items}
    `);
}

// // minimal Example configuration for full grid
// //
// var grid_conf = {
//     rows: 3,
//     columns: 2,
//     items: [
//         {
//             id: '1',
//             value: 'a1'
//         },
//         {
//             id: '2',
//             value: 'a2'
//         },
//         {
//             id: '3',
//             value: 'a3'
//         },
//         {
//             id: '1',
//             value: 'a1'
//         },
//         {
//             id: '1',
//             value: 'a1'
//         },
//         {
//             id: '1',
//             value: 'a1'
//         },
//         {
//             id: '1',
//             value: 'a1'
//         },
//     ]
// };
