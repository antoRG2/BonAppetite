/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_service_menu_service__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_service_clients_service__ = __webpack_require__(9);



$(document).ready(function () {
    var app = new Vue({
        el: '#app',
        data: {
            message: 'You loaded this page on ' + new Date()
        }
    })
    
    // execute the menu-service init 
    __WEBPACK_IMPORTED_MODULE_0__menu_service_menu_service__["a" /* default */].gridInit();
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let MenuGrid = __webpack_require__(3);

function gridInit() {
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
        if (item.children) {
            this.updateContent(item.children);
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
}

/* harmony default export */ __webpack_exports__["a"] = ({ gridInit });

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuGridComponent", function() { return MenuGridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_grid_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_grid_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__menu_grid_css__);


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


MenuGrid.prototype.createContentContainer = function( gridConfiguration ) {
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
        stylesRows += 'grid-auto-rows: minmax(100px, auto);'
    } else {
        stylesRows += `grid-template-rows: repeat(${rows}, 1fr);`
    }

    grid.setAttribute('style', [styles, stylesCol, stylesRows].join(';') );

    return { grid, styles, stylesCol, stylesRows};
}

MenuGrid.prototype.createContent = function( gridContentDomElement, items ) {
    if ( items ) {
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

MenuGrid.prototype.updateContent = function( items ) {
    let content = this.domElement.querySelector( '.grid-container' );
    this.clearContent();
    this.createContent( content, items );
}

MenuGrid.prototype.createActions = function( actionsDef, styles, stylesCol ) {
    let actionsRow = document.createElement('div');
    
    actionsRow.classList.add(['grid-actions']);
    let actions = actionsDef;
    
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
    }

    actionsRow.setAttribute('style', [styles, stylesCol].join(';') );

    return actionsRow;
}


MenuGrid.prototype.generateDom = function (gridConfiguration) {
    
    let gridProps = this.createContentContainer( gridConfiguration );
    let content = this.createContent( gridProps.grid, gridConfiguration.items );
    let actionsRow = this.createActions( gridConfiguration.actionsDef,
                             gridProps.styles, gridProps.stylesCol );

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

    wrapper.appendChild( gridProps.grid );
    wrapper.appendChild( actionsRow );

    return wrapper;
}

MenuGrid.prototype.clearContent = function(  ) {
    let content = this.domElement.querySelector( '.grid-container' );
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

let MenuGridComponent = MenuGrid;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"attrs":{"id":"id"}}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./menu-grid.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./menu-grid.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".grid-wrapper {\n    width: 100%;\n}\n\n.grid-wrapper > .grid-container > .grid-cell {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    word-break: break-word;\n    padding: 5px;\n    box-sizing: border-box;\n}\n\n.grid-wrapper > .grid-container > .grid-cell:nth-child(even) {\n    background-color: white;\n}\n\n.grid-wrapper > .grid-container > .grid-cell:nth-child(odd) {\n    background-color: green;\n}\n\n.grid-actions {\n    margin-top: 10px;\n}\n\n.grid-actions > .action-cell {\n    height: 100px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    word-break: break-word;\n    padding: 5px;\n    box-sizing: border-box;\n    background-color: rosybrown;\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



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

/* unused harmony default export */ var _unused_webpack_default_export = ({ ClientsService });



/***/ })
/******/ ]);