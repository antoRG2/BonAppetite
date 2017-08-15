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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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

var	fixUrls = __webpack_require__(7);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_tabs_vue_tabs_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_tabs_vue_tabs_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vue_tabs_vue_tabs_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_tabs_vue_tabs_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_tabs_vue_tabs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_tabs_vue_tabs_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_styles_menu_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_styles_menu_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__menu_styles_menu_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_service_menu_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_service_clients_service__ = __webpack_require__(14);








$(document).ready(function () {

    let _data = {
        clients: [],
        clientsService: __WEBPACK_IMPORTED_MODULE_4__menu_service_clients_service__["a" /* default */].service,
        activeClient: {},
        activeTabIndex: -1
    };


    var app = new Vue({
        el: '#app',
        data: _data,
        created: function () {
            // application init
            this.clientsService.clients = this.clients;
        },
        methods: {
            tabChanged: function( activeTabIndex, newTab, oldTab ) {
                this.activeTabIndex = activeTabIndex;
                this.activeClient = this.clients[activeTabIndex];
                this.clientsService.activeClient = this.activeClient;
            }
        }
    })

    // execute the menu-service init 
    __WEBPACK_IMPORTED_MODULE_3__menu_service_menu_service__["a" /* default */].gridInit( app );
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

        console.log(app.$data.activeTab);
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

    $('#payButton').on("click", function () {
        //abre modal
        $("#pagoFacturaModal").modal();
    });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-nav-tabs v0.5.1
 * (c) 2017-present cristij <joracristi@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueTabs = global.vueTabs || {})));
}(this, (function (exports) { 'use strict';

var VueTabs = {
    name: 'vue-tabs',
    props: {
        activeTabColor: String,
        activeTextColor: String,
        /**
         * Tab title position: center | bottom | top
         */
        textPosition: {
            type: String,
            default: 'center'
        },
        /**
         * Tab type: tabs | pills
         */
        type: {
            type: String,
            default: 'tabs'
        },
        direction: {
            type: String,
            default: 'horizontal'
        },
        /**
         * Centers the tabs and makes the container div full width
         */
        centered: Boolean,
        value: [String, Number, Object]
    },
    data: function data() {
        return {
            activeTabIndex: 0,
            tabs: []
        };
    },

    computed: {
        isTabShape: function isTabShape() {
            return this.type === 'tabs';
        },
        isStacked: function isStacked() {
            return this.direction === 'vertical';
        },
        classList: function classList() {
            var navType = this.isTabShape ? 'nav-tabs' : 'nav-pills';
            var centerClass = this.centered ? 'nav-justified' : '';
            var isStacked = this.isStacked ? 'nav-stacked' : '';
            return 'nav ' + navType + ' ' + centerClass + ' ' + isStacked;
        },
        stackedClass: function stackedClass() {
            return this.isStacked ? 'stacked' : '';
        },
        activeTabStyle: function activeTabStyle() {
            return {
                backgroundColor: this.activeTabColor,
                color: this.activeTextColor
            };
        }
    },
    methods: {
        navigateToTab: function navigateToTab(index, route) {
            this.changeTab(this.activeTabIndex, index, route);
        },
        activateTab: function activateTab(index) {
            this.activeTabIndex = index;
            var tab = this.tabs[index];
            tab.active = true;
            this.$emit('input', index);
        },
        changeTab: function changeTab(oldIndex, newIndex, route) {
            this.activeTabIndex = newIndex;
            var oldTab = this.tabs[oldIndex];
            var newTab = this.tabs[newIndex];
            oldTab.active = false;
            newTab.active = true;
            //this.$emit('input', newIndex);
            this.$emit('tab-change', newIndex, newTab, oldTab);
            this.tryChangeRoute(route);
        },
        tryChangeRoute: function tryChangeRoute(route) {
            if (this.$router && route) {
                this.$router.push(route);
            }
        },
        addTab: function addTab(item) {
            var index = this.$slots.default.indexOf(item.$vnode);
            this.tabs.splice(index, 0, item);
        },
        removeTab: function removeTab(item) {
            var tabs = this.tabs;
            var index = tabs.indexOf(item);
            if (index > -1) {
                tabs.splice(index, 1);
            }
        },
        getTabs: function getTabs() {
            if (this.$slots.default) {
                return this.$slots.default.filter(function (comp) {
                    return comp.componentOptions;
                });
            }
            return [];
        },
        findTabAndActivate: function findTabAndActivate(tabNameOrIndex) {
            var indexToActivate = this.tabs.findIndex(function (tab, index) {
                return tab.title === tabNameOrIndex || index === tabNameOrIndex;
            });
            if (indexToActivate != -1) {
                this.changeTab(this.activeTabIndex, indexToActivate);
            } else {
                this.changeTab(this.activeTabIndex, 0);
            }
        },
        renderTabTitle: function renderTabTitle(index) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var active = tab.active,
                title = tab.title;

            var titleStyles = { color: this.activeTabColor };
            if (position === 'center') titleStyles.color = this.activeTextColor;
            var simpleTitle = h(
                'span',
                { 'class': 'title title_' + position, style: active ? titleStyles : {} },
                [position === 'center' && this.renderIcon(index), '\xA0', title]
            );

            if (tab.$slots.title) return tab.$slots.title;
            return simpleTitle;
        },
        renderIcon: function renderIcon(index) {
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var icon = tab.icon;

            var simpleIcon = h(
                'i',
                { 'class': icon },
                []
            );
            if (!tab.$slots.title && icon) return simpleIcon;
        },
        renderTabs: function renderTabs() {
            var _this = this;

            var h = this.$createElement;

            return this.tabs.map(function (tab, index) {
                if (!tab) return;
                var route = tab.route,
                    id = tab.id,
                    title = tab.title,
                    icon = tab.icon;

                var active = _this.activeTabIndex === index;
                return h(
                    'li',
                    {
                        attrs: { name: 'tab',
                            role: 'presentation' },
                        on: {
                            'click': function click() {
                                return _this.navigateToTab(index, route);
                            }
                        },
                        'class': ['tab', { active: active }],
                        key: title },
                    [_this.textPosition === 'top' && _this.renderTabTitle(index, _this.textPosition), h(
                        'a',
                        {
                            attrs: { href: 'javascript:void(0)',

                                'aria-selected': active,
                                'aria-controls': '#' + id,
                                role: 'tab' },
                            on: {
                                'click': function click() {
                                    return _this.navigateToTab(index);
                                }
                            },

                            style: active ? _this.activeTabStyle : {},
                            'class': { 'active_tab': active } },
                        [_this.textPosition !== 'center' && !tab.$slots.title && _this.renderIcon(index), _this.textPosition === 'center' && _this.renderTabTitle(index, _this.textPosition)]
                    ), _this.textPosition === 'bottom' && _this.renderTabTitle(index, _this.textPosition)]
                );
            });
        }
    },
    render: function render() {
        var h = arguments[0];

        var tabList = this.renderTabs();
        return h(
            'div',
            { 'class': ['vue-tabs', this.stackedClass] },
            [h(
                'div',
                { 'class': [{ 'nav-tabs-navigation': !this.isStacked }, { 'left-vertical-tabs': this.isStacked }] },
                [h(
                    'div',
                    { 'class': ['nav-tabs-wrapper', this.stackedClass] },
                    [h(
                        'ul',
                        { 'class': this.classList, attrs: { role: 'tablist' }
                        },
                        [tabList]
                    )]
                )]
            ), h(
                'div',
                { 'class': ['tab-content', { 'right-text-tabs': this.isStacked }] },
                [this.$slots.default]
            )]
        );
    },

    watch: {
        tabs: function tabs(newList) {
            if (newList.length > 0 && !this.value) {
                this.activateTab(this.activeTabIndex);
            }
            if (newList.length > 0 && this.value) {
                this.findTabAndActivate(this.value);
            }
        },
        value: function value(newVal) {
            this.findTabAndActivate(newVal);
        }
    }
};

var VTab = {
    name: 'v-tab',
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        /***
         * Function to execute before tab switch. Return value must be boolean
         * If the return result is false, tab switch is restricted
         */
        beforeChange: {
            type: Function
        },
        id: String,
        route: {
            type: [String, Object]
        },
        transitionName: String,
        transitionMode: String
    },
    computed: {
        isValidParent: function isValidParent() {
            return this.$parent.$options.name === 'vue-tabs';
        },
        hash: function hash() {
            return '#' + this.id;
        }
    },
    data: function data() {
        return {
            active: false,
            validationError: null
        };
    },
    mounted: function mounted() {
        this.$parent.addTab(this);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeTab(this);
    },
    render: function render() {
        var h = arguments[0];

        return h(
            'section',
            { 'class': 'tab-container',
                attrs: { role: 'tabpanel' },
                directives: [{
                    name: 'show',
                    value: this.active
                }]
            },
            [this.$slots.default]
        );
    }
};

var VueTabsPlugin = {
  install: function install(Vue) {
    Vue.component('vue-tabs', VueTabs);
    Vue.component('v-tab', VTab);
  }
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTabsPlugin);
  window.VueTabs = VueTabsPlugin;
}

exports['default'] = VueTabsPlugin;
exports.VueTabs = VueTabs;
exports.VTab = VTab;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"attrs":{"id":"id"}}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./vue-tabs.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./vue-tabs.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".vue-tabs.stacked {\n  display: flex\n}\n\n.vue-tabs a {\n  text-decoration: none;\n  color: gray\n}\n\n.vue-tabs .nav {\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-left: 0;\n  list-style: none\n}\n\n.vue-tabs .nav:before,\n.vue-tabs .nav:after {\n  content: \" \";\n  display: table\n}\n\n.vue-tabs .nav:after {\n  clear: both\n}\n\n.vue-tabs .nav>li {\n  position: relative;\n  display: block\n}\n\n.vue-tabs .nav>li>a {\n  position: relative;\n  display: block;\n  padding: 10px 15px\n}\n\n.vue-tabs .nav>li>a:hover,\n.vue-tabs .nav>li>a:focus {\n  text-decoration: none;\n  background-color: #eee\n}\n\n.vue-tabs .nav>li span.title {\n  display: flex;\n  justify-content: center\n}\n\n.vue-tabs .nav>li.disabled>a {\n  color: #777\n}\n\n.vue-tabs .nav>li.disabled>a:hover,\n.vue-tabs .nav>li.disabled>a:focus {\n  color: #777;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed\n}\n\n.vue-tabs .nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5\n}\n\n.vue-tabs .nav>li>a>img {\n  max-width: none\n}\n\n.vue-tabs .nav-tabs {\n  border-bottom: 1px solid #ddd\n}\n\n.vue-tabs .nav-tabs>li {\n  float: left;\n  margin-bottom: -1px\n}\n\n.vue-tabs .nav-tabs>li>a {\n  margin-right: 2px;\n  line-height: 1.42857;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0\n}\n\n.vue-tabs .nav-tabs>li>a:hover {\n  border-color: #eee #eee #ddd\n}\n\n.vue-tabs .nav-tabs>li.active>a,\n.vue-tabs .nav-tabs>li.active>a:hover,\n.vue-tabs .nav-tabs>li.active>a:focus {\n  color: #fff;\n  background-color: #f0ad4e;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  cursor: default\n}\n\n.vue-tabs .nav-pills>li {\n  float: left\n}\n\n.vue-tabs .nav-pills>li>a {\n  border-radius: 4px\n}\n\n.vue-tabs .nav-pills>li+li {\n  margin-left: 2px\n}\n\n.vue-tabs .nav-pills>li.active>a,\n.vue-tabs .nav-pills>li.active>a:hover,\n.vue-tabs .nav-pills>li.active>a:focus {\n  color: #fff;\n  background-color: #337ab7\n}\n\n.vue-tabs .nav-stacked>li {\n  float: none\n}\n\n.vue-tabs .nav-stacked>li+li {\n  margin-top: 2px;\n  margin-left: 0\n}\n\n.vue-tabs .nav-justified,\n.vue-tabs .nav-tabs.nav-justified {\n  width: 100%\n}\n\n.vue-tabs .nav-justified>li,\n.vue-tabs .nav-tabs.nav-justified>li {\n  float: none\n}\n\n.vue-tabs .nav-justified>li>a,\n.vue-tabs .nav-tabs.nav-justified>li>a {\n  text-align: center;\n  margin-bottom: 5px\n}\n\n.vue-tabs .nav-justified>.dropdown .dropdown-menu {\n  top: auto;\n  left: auto\n}\n\n@media (min-width: 768px) {\n  .vue-tabs .nav-justified>li,\n  .vue-tabs .nav-tabs.nav-justified>li {\n    display: table-cell;\n    width: 1%\n  }\n  .vue-tabs .nav-justified>li>a,\n  .vue-tabs .nav-tabs.nav-justified>li>a {\n    margin-bottom: 0\n  }\n}\n\n.vue-tabs .nav-tabs-justified,\n.vue-tabs .nav-tabs.nav-justified {\n  border-bottom: 0\n}\n\n.vue-tabs .nav-tabs-justified>li>a,\n.vue-tabs .nav-tabs.nav-justified>li>a {\n  margin-right: 0;\n  border-radius: 4px\n}\n\n.vue-tabs .nav-tabs-justified>.active>a,\n.vue-tabs .nav-tabs.nav-justified>.active>a,\n.vue-tabs .nav-tabs-justified>.active>a:hover,\n.vue-tabs .nav-tabs.nav-justified>.active>a:hover,\n.vue-tabs .nav-tabs-justified>.active>a:focus,\n.vue-tabs .nav-tabs.nav-justified>.active>a:focus {\n  border: 1px solid #ddd\n}\n\n@media (min-width: 768px) {\n  .vue-tabs .nav-tabs-justified>li>a,\n  .vue-tabs .nav-tabs.nav-justified>li>a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0\n  }\n  .vue-tabs .nav-tabs-justified>.active>a,\n  .vue-tabs .nav-tabs.nav-justified>.active>a,\n  .vue-tabs .nav-tabs-justified>.active>a:hover,\n  .vue-tabs .nav-tabs.nav-justified>.active>a:hover,\n  .vue-tabs .nav-tabs-justified>.active>a:focus,\n  .vue-tabs .nav-tabs.nav-justified>.active>a:focus {\n    border-bottom-color: #fff\n  }\n}\n\n.vue-tabs .tab-content>.tab-pane {\n  display: none\n}\n\n.vue-tabs .tab-content>.active {\n  display: block\n}\n\n.vue-tabs section[aria-hidden=\"true\"] {\n  display: none\n}", ""]);

// exports


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"attrs":{"id":"id"}}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./menu.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./menu.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".tabs-container {\n  background: white;\n}\n\nli.active > a.active_tab {\n  background-color: #f0ad4e;\n}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let MenuGrid = __webpack_require__(11);

function gridInit(app) {
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
        } else { // no children
            // TODO: Make this return callback to decouple logic
            if(app.activeClient.orders) {
                app.activeClient.orders.push({ name: item.value });
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
}

/* harmony default export */ __webpack_exports__["a"] = ({ gridInit });

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuGridComponent", function() { return MenuGridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_grid_css__ = __webpack_require__(12);
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

let MenuGridComponent = MenuGrid;



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"attrs":{"id":"id"}}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".grid-wrapper {\n    width: 100%;\n}\n\n.grid-wrapper > .grid-container > .grid-cell {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    word-break: break-word;\n    padding: 5px;\n    box-sizing: border-box;\n}\n\n.grid-wrapper > .grid-container > .grid-cell:nth-child(even) {\n    background-color: white;\n}\n\n.grid-wrapper > .grid-container > .grid-cell:nth-child(odd) {\n    background-color: green;\n}\n\n.grid-actions {\n    margin-top: 10px;\n}\n\n.grid-actions > .action-cell {\n    height: 100px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    word-break: break-word;\n    padding: 5px;\n    box-sizing: border-box;\n    background-color: rosybrown;\n}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = ({ service });



/***/ })
/******/ ]);