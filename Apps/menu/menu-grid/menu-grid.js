import style from './menu-grid.css';

function MenuGrid(columns, rows, items) {
    this.domElement;
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
        height: 'auto',
        minmax: '80px'
    };
    
    this.columnsDef = {
        width: 'auto'
    };

    this.defaultProps = {
        columns: 1,
        rows: 0,
        rowsDef: {
            autoRows: false,
            height: 'auto',
            minmax: '80px'
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

    this.domElement = this.generateDom(grid);
    return this.domElement;
}

MenuGrid.prototype.valueFormatterCallback = function (item) {
    if (this.itemsDef && this.itemsDef.dataFormatter) {
        return this.itemsDef.dataFormatter(item);
    } else {
        return item;
    }
}


MenuGrid.prototype.createContentContainer = function (gridConfiguration) {
    let cols = gridConfiguration.columns;
    let rows = gridConfiguration.rows;

    let grid = document.createElement('div');
    grid.classList.add('grid-container');
    let styles = `
        display: grid;
        grid-gap: 10px;
    `;
    let stylesCol = `grid-template-columns: repeat(${cols}, 1fr);`;
    let stylesRows = '';
    if (gridConfiguration.rowsDef.autoRows) {
        stylesRows += `grid-auto-rows: minmax(${gridConfiguration.rowsDef.minmax}, auto);`;
    } else {
        stylesRows += `grid-template-rows: repeat(${rows}, 1fr);`
    }

    grid.setAttribute('style', [styles, stylesCol, stylesRows].join(';'));

    return { grid, styles, stylesCol, stylesRows };
}

MenuGrid.prototype.createContent = function (gridContentDomElement, items) {
    if (items) {
        items.forEach((element) => {
            let gItem = document.createElement('div');
            gItem.setAttribute('clickable', 'true');
            gItem.data = element;
            gItem.classList.add(['grid-cell']);
            if (this.valueFormatterCallback) {
                gItem.innerText = this.valueFormatterCallback(element);
            }

            gridContentDomElement.appendChild(gItem);
        });
    }
}

MenuGrid.prototype.updateContent = function (items) {
    let content = this.domElement.querySelector('.grid-container');
    this.clearContent();
    this.createContent(content, items);
}

MenuGrid.prototype.createActions = function (actionsDef, styles, stylesCol) {
    let actionsRow = document.createElement('div');

    actionsRow.classList.add(['grid-actions']);
    let actions = actionsDef;

    if (actions && actions.length) {
        actions.forEach((action) => {
            let gItem = document.createElement('div');
            gItem.data = action;
            gItem.classList.add(['action-cell']);
            gItem.innerText = action.value;
            gItem.addEventListener('click', function () {
                action.action();
            });

            actionsRow.appendChild(gItem);
        });
    }

    actionsRow.setAttribute('style', [styles, stylesCol].join(';'));

    return actionsRow;
}


MenuGrid.prototype.generateDom = function (gridConfiguration) {

    let gridProps = this.createContentContainer(gridConfiguration);
    let content = this.createContent(gridProps.grid, gridConfiguration.items);
    let actionsRow = this.createActions(gridConfiguration.actionsDef,
        gridProps.styles, gridProps.stylesCol);

    // event listeners
    gridProps.grid.addEventListener('click', (event) => {
        if (event.target && event.target.hasAttribute('clickable')) {
            if (typeof (this.itemsCallback) === 'function') {
                this.itemsCallback(event, event.target.data);
            }
        }
    }, true);


    let wrapper = document.createElement('div');
    wrapper.classList.add(['grid-wrapper']);

    wrapper.appendChild(gridProps.grid);
    wrapper.appendChild(actionsRow);

    return wrapper;
}

MenuGrid.prototype.clearContent = function () {
    let content = this.domElement.querySelector('.grid-container');
    content.innerHTML = '';
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

let MenuGridComponent = MenuGrid;

export { MenuGridComponent }