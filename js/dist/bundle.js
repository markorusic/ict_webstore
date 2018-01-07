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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var params = null;

	//parse url get parameters to array of js key: value objects
	function _parseUrl() {
		params = location.search == "" ? [] : location.search.slice(1).split('&').map(function (e) {
			return { key: e.split('=')[0], value: e.split('=')[1] };
		});
	}

	//parse js array to query string and push state to it's value
	function _createQueryString() {
		return (params.length > 0 ? '?' : '') + params.map(function (e) {
			return e.key + '=' + e.value;
		}).join('&');
	}

	function _updateUrl() {
		window.history.pushState('', '', location.pathname + _createQueryString());
	}

	return {
		getParam: function getParam(str) {
			_parseUrl();

			var param = params.find(function (item) {
				return item.key == str;
			});
			return param ? param.value : null;
		},
		setParam: function setParam(param, value) {
			_parseUrl();

			var isFound = false;

			//look for param, if found update, if not create new
			params = params.map(function (e) {
				if (e.key == param) {
					e.value = value;
					isFound = true;
				}
				return e;
			});

			if (!isFound) params.push({ key: param, value: value });

			_updateUrl();
		},
		removeParam: function removeParam(str) {
			_parseUrl();

			params = params.filter(function (item) {
				return item.key != str;
			});

			_updateUrl();
		}
	};
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cart = __webpack_require__(2);

var _cart2 = _interopRequireDefault(_cart);

var _templates = __webpack_require__(7);

var _templates2 = _interopRequireDefault(_templates);

var _url = __webpack_require__(0);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	//state
	var article = null;

	//cahce DOM
	var $modal = null;
	var $domElement = null;
	var $root = null;

	//private methods
	function _addToCart(article, $btn, e) {
		e.preventDefault();
		e.stopPropagation();

		_cart2.default.add(article);

		if ($btn) {
			//show tooltip and hide it after 2.5 sec
			$btn.tooltip('show');
			setTimeout(function () {
				$btn.tooltip('hide');
				$btn.off('.tooltip');
			}, 2500);
		}
	}

	function _removeFromCart(articleId, e) {
		e.preventDefault();
		e.stopPropagation();

		_cart2.default.remove(articleId);
	}

	function _openLightBox(article, e) {
		if (e) e.preventDefault();

		$('body').css('overflow', 'hidden').append(_templates2.default.articleModal(article));

		$modal = $('#article-photo-modal');
		$modal.show();
		_bindModalEvents(article);

		_url2.default.setParam('articleId', article.id);
	}

	function _closeLightBox(e) {
		e.preventDefault();

		$modal.remove();
		$modal = null;

		$('body').css('overflow-y', 'scroll');

		_url2.default.removeParam('articleId');
	}

	function _bindModalEvents(article) {
		//stop event propagation on all child elements(don't close modal on children click)
		$modal.children().on('click', function (e) {
			return e.stopPropagation();
		});

		//closing events
		$modal.find('.fa-times').on('click', _closeLightBox);
		$modal.on('click', _closeLightBox);

		//add article to cart event
		$modal.find('.add-to-cart').on('click', _addToCart.bind(this, article, $modal.find('.add-to-cart')));
	}

	//public methods
	return {
		init: function init(article, type, $rootElement, num) {
			$root = $rootElement;
			this.setArticle(article);
			this.render(type, num);
			$domElement = $root.children().last();
			this.bindEvents(article, type);
		},
		render: function render(type, num) {
			var template = '';
			if (type == "box-view") template = _templates2.default.article(article);else if (type == "table-view") template = _templates2.default.articleTr(article, num);else if (type == "popover-table-view") template = _templates2.default.articleTrPopover(article, num);

			$root.append(template);
		},
		getArticle: function getArticle() {
			return article;
		},
		setArticle: function setArticle(newArticle) {
			article = newArticle;
		},
		showArticle: function showArticle(article) {
			_openLightBox(article);
		},
		bindEvents: function bindEvents(article, type) {
			if (type == "box-view") {
				$domElement.on('click', _openLightBox.bind(this, article));
				$domElement.find('.add-to-cart').on('click', _addToCart.bind(this, article, $domElement.find('.add-to-cart')));
			} else if (type == "table-view") $domElement.find('.remove-form-cart').on('click', _removeFromCart.bind(this, article.id));
		}
	};
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _article = __webpack_require__(1);

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

	//main state
	var items = [];
	var isNotificationShowing = false;
	var isPopoverCartShowing = false;

	//cache DOM
	var $articles = $('.cart tbody');
	var $total = $('.total-price');
	var $navItemsCount = $('.cart-items-count');
	var $popoverCart = $('.popover-cart');
	var $nofitication = $('.cart-notification');
	var $cacheOutFrom = $('.cart').find('.cache-out');

	// sync local state with localstorage
	function _syncWithLocalStorage() {
		localStorage.setItem('markorusic_webstore_cart_items', JSON.stringify(items));
	}

	//remove all items from cart
	function _emtpyCart() {
		items = [];
		_syncWithLocalStorage();
	}

	function _getTotalPrice() {
		return items.map(function (el) {
			return el.count * el.price;
		}).reduce(function (a, b) {
			return a + b;
		}, 0);
	}

	function _getTotalCount() {
		return items.map(function (el) {
			return el.count;
		}).reduce(function (a, b) {
			return a + b;
		}, 0);
	}

	//render item count on navigation
	function _renderCount() {
		$navItemsCount.text('(' + _getTotalCount() + ')');
	}

	//render total price of cart items
	function _renderTotalPrice() {
		$total.text(_getTotalPrice());
	}

	//render full cart
	function _renderCart() {
		$articles.html('');
		items.forEach(function (item, i) {
			return _article2.default.init(item, 'table-view', $articles, i + 1);
		});
		_renderTotalPrice();
	}

	//render cart popover
	function _renderPopoverCart() {
		isPopoverCartShowing = true;

		$popoverCart.find('tbody').html('');

		items.slice(0, 4).forEach(function (item, i) {
			_article2.default.init(item, 'popover-table-view', $popoverCart.find('tbody'), i + 1);
		});

		if (items.length > 4) $popoverCart.find('tbody').append('<tr><td class="mt" colspan="4"><a href="/korpa.php" style="color: #fcca39; font-size: 14px;">Pogledaj sve...</a></td><tr>');

		_renderTotalPrice();

		$popoverCart.show('fast');
		bindClosingEvent($popoverCart, 'popover-cart');
	}

	//render nofitication when user adds something to cart
	function _notify() {
		if (!isPopoverCartShowing) {
			$nofitication.show('fast');
			$nofitication.find('.show-popover-cart').off().on('click', function (e) {
				e.preventDefault();
				$nofitication.fadeOut(_renderPopoverCart);
			});
			bindClosingEvent($nofitication, 'notification');
			isNotificationShowing = true;
		} else {
			_renderPopoverCart();
		}
	}

	//bind closing event on passed element
	function bindClosingEvent(el, type) {
		$(el).find('.close-notification').off().on('click', function (e) {
			e.preventDefault();
			$(el).hide('fast');

			if (type == 'notification') isNotificationShowing = false;
			if (type == 'popover-cart') isPopoverCartShowing = false;
		});
	}

	function _submitOrder(e) {
		e.preventDefault();
		if (items.length > 0) {
			$(this).find('button').css({
				'color': 'black',
				'fontSize': '10px'
			}).text('Molimo Vas da sacekate...');

			setTimeout(function () {
				$('#main-row').html('\n\t\t\t\t\t<div class="col-12 text-center">\n\t\t\t\t\t\t<h3 class="text-center font-25">Vasa narudzbina je poslata, uskoro cete dobiti obavestenje!</h3>\n\t\t\t\t\t\t<p>(Ovo je samo demo sajt, narudzbina nije poslata nigde.)</p>\n\t\t\t\t\t</div>\n\t\t\t\t');
				_emtpyCart();
				_renderCount();
			}, 1500);
		}
	}

	// triggers on cart page if cart is empty
	function _renderEmptyCart() {
		$('#main-row').html('\n\t\t\t<div class="col-12">\n\t\t\t\t<h3 class="text-center font-25">Vasa korpa je prazna, <a href="/">ovde</a> mozete pogledati nase proizvode.</h3>\n\t\t\t</div>\n\t\t');
	}

	return {
		init: function init() {
			var localStorageCart = JSON.parse(localStorage.getItem('markorusic_webstore_cart_items'));
			if (localStorageCart) items = localStorageCart;
			_renderCount();
		},
		initCacheOutForm: function initCacheOutForm() {
			if (items.length == 0) _renderEmptyCart();else $cacheOutFrom.on('submit', _submitOrder);
		},
		add: function add(item) {
			var cartItem = items.find(function (el) {
				return el.id == item.id;
			});
			if (!cartItem) {
				items.push(_extends({}, item, { 'count': 1 }));
			} else {
				cartItem.count++;
				items.map(function (el) {
					return el.id == item.id ? cartItem : el;
				});
			}
			_renderCount();
			_notify();
			_syncWithLocalStorage();
		},
		remove: function remove(id) {
			items = items.filter(function (e) {
				return e.id != id;
			});
			_renderCount();

			if (items.length == 0) _renderEmptyCart();else this.render();

			_syncWithLocalStorage();
		},
		render: function render() {
			_renderCart();
		}
	};
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _modals = __webpack_require__(4);

var _modals2 = _interopRequireDefault(_modals);

var _counter = __webpack_require__(5);

var _counter2 = _interopRequireDefault(_counter);

var _articles = __webpack_require__(6);

var _articles2 = _interopRequireDefault(_articles);

var _cart = __webpack_require__(2);

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {

	var url = window.location.pathname;
	var fileName = url.substring(url.lastIndexOf('/') + 1);

	$('a[href="' + fileName + '"]').parent().addClass('active');

	_modals2.default.init([['#hero-share-store', '#share-store-modal'], ['.open-login-modal', '#login-modal'], ['.open-register-modal', '#register-modals']]);

	$('button').not('.submit-cart').on('click', function (e) {
		return e.preventDefault();
	});

	if (url == '/' || url == '/index.php') {
		(0, _counter2.default)('.shop-counter');
		_articles2.default.init();
	}

	_cart2.default.init();

	if (url == '/korpa.php') {
		_cart2.default.render();
		_cart2.default.initCacheOutForm();
	}
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	// const $modals = $('.modal-mask')

	function _bindModalEvents() {

		var $modal = $('.modal-mask');

		var __closeModals = function __closeModals(e) {
			e.preventDefault();
			$('body').css('overflow', 'auto');
			$modal.hide();
		};

		$modal.on('click', __closeModals);
		$modal.find('.fa-times').parent().on('click', __closeModals);
		$modal.find('.modal-wrapper').on('click', function (e) {
			return e.stopPropagation();
		});
	}

	function _showModal(e, selector) {
		e.preventDefault();
		$(selector).show().css('display', 'flex');
		$('body').css('overflow', 'hidden');
		_bindModalEvents();
	}

	return {
		init: function init(data) {
			data.forEach(function (el) {
				return $(el[0]).on('click', function (e) {
					return _showModal(e, el[1]);
				});
			});
		}
	};
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(rootElement) {
  var clock = $(rootElement);
  var daysSpan = clock.find('.days');
  var hoursSpan = clock.find('.hours');
  var minutesSpan = clock.find('.minutes');
  var secondsSpan = clock.find('.seconds');

  var endtime = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.text(t.days);
    hoursSpan.text(('0' + t.hours).slice(-2));
    minutesSpan.text(('0' + t.minutes).slice(-2));
    secondsSpan.text(('0' + t.seconds).slice(-2));

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

exports.default = initializeClock;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _url = __webpack_require__(0);

var _url2 = _interopRequireDefault(_url);

var _article = __webpack_require__(1);

var _article2 = _interopRequireDefault(_article);

var _mockUpData = __webpack_require__(8);

var _mockUpData2 = _interopRequireDefault(_mockUpData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
	//cache DOM
	var $root = $('.store-articles-list');
	var $sort = $root.find('ul li a');
	var $articles = $root.find('.articles-row');
	var $search = $root.find('.search-articles-by-name').find('input[type="text"]');

	var state = {
		items: [],
		itemsCopy: []
	};

	function _search(e) {
		state.items = state.itemsCopy.filter(function (item) {
			return item.name.toLowerCase().indexOf(e.target.value) != -1;
		});
		_render();
	}

	function _getArticleData(type) {
		if (type == 'sve') return _mockUpData2.default.articles;

		return _mockUpData2.default.articles.filter(function (e) {
			return e.categories.indexOf(type) != -1;
		});
	}

	function _render() {
		$articles.html('');
		state.items.forEach(function (item) {
			return _article2.default.init(item, 'box-view', $articles);
		});
	}

	function _bindEvents() {
		$sort.off();
		$sort.on('click', function (e) {
			e.preventDefault();
			var filter = $(this).data().sort;
			_url2.default.setParam('filter', filter);
			_init();
		});
	}

	function _init() {
		var filterType = _url2.default.getParam('filter') || 'cipele';
		state.items = _getArticleData(filterType);
		state.itemsCopy = [].concat(_toConsumableArray(state.items));

		//set active tab		
		$sort.removeClass('sb-active');
		$sort.parent().find('[data-sort=\'' + filterType + '\']').addClass('sb-active');

		//empty search input
		$search.val('');

		_render();
		_bindEvents();
	}

	//tell article module to show specific article if articleId get param is passed
	function _showArticleIfShould() {
		var activeArticleId = _url2.default.getParam('articleId');

		if (activeArticleId) {
			var activeArticle = state.items.find(function (item) {
				return item.id == activeArticleId;
			});

			if (activeArticle) _article2.default.showArticle(activeArticle);else {
				alert('Proizvod nije pronadjen!');
				_url2.default.removeParam('articleId');
			}
		} else _url2.default.removeParam('articleId');
	}

	return {
		init: function init() {
			_init();
			_showArticleIfShould();
			$search.on('keyup', _search);
		}
	};
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    article: function article(_article) {
        return '\n\t\t\t<div class="store-item-wrapper">\n                <article class="store-articles-list-item"\n                         style="background-image: url(\'' + _article.img + '\');">\n                    <div class="cpli-overlay"><!-- class overlay --></div>\n                    <div class="cpli-content">\n                        <div class="article-info-strip">\n                            <div>\n                                <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>\n                                <span>' + _article.price + '</span>\n                            </div>\n                            <div>\n                                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>\n                                <span>' + _article.stars + '</span>\n                            </div>\n                        </div>\n                        <div class="text-center store-article-info">\n                            <p class="font-16">' + _article.name + '</p>\n                            <a href="#" class="btn-white add-to-cart" data-toggle="tooltip" data-placement="top" title="Dodato u korupu!" data-animation="false">\n                            \t<i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>\n                        </div>\n                    </div>\n                </article>\n            </div>\n\t\t';
    },

    articleTr: function articleTr(article, num) {
        return '\n\t\t\t<tr>\n                <td>#' + num + '</td>\n                <td class="rl-avatar-td">\n                    <a href="#">\n                        <div class="article-avatar"\n                             style="background-image: url(\'' + article.img + '\');"></div>\n                    </a>\n                </td>\n                <td>\n                    <span>\n                        ' + article.name + '\n                    </span>\n                </td>\n                <td>' + article.count + '</td>\n                <td>' + article.price * article.count + '</td>\n                <td>\n                \t<a href="#" class="remove-form-cart btn btn-danger-btn-sm"><i class="fa fa-times"></i></a>\n                </td>\n            </tr>\n\t\t';
    },

    articleTrPopover: function articleTrPopover(article) {
        return '\n\t\t\t<tr>\n                <td>\n                    <a href="#">\n                        <div class="article-avatar" style="background-image: url(\'' + article.img + '\');"></div>\n                    </a>\n                </td>\n                <td>' + article.name + '</td>\n                <td>' + article.count + '</td>\n                <td>' + article.price * article.count + '</td>\n            </tr>\n\t\t';
    },

    articleModal: function articleModal(article) {
        return '\n    <div class="modal-mask shop-photo-modal" id="article-photo-modal" style="display: none;">\n        <div class="container">\n            <div class="modal-wrapper">\n                <div class="modal-container">\n                    <div class="flex-space-around-res">\n                        <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>\n                        <div class="col-12 col-md-8 cpm-bg">\n                            <img src="' + article.img + '" alt="' + article.desc + '" class="img-fluid">\n                        </div>\n\n                        <div class="cpm-bg-fff p-20">\n                            <div class="modal-body">\n\n                                <!-- hdr -->\n                                <div class="shop-photo-modal-header">\n                                    <div class="hdr-wrapper">\n                                        <h2>' + article.name + '</h2>                                        \n                                    </div>\n\n                                    <!-- Vote strip -->\n                                    <p class="article-categories">Katogirije: <span>' + article.categories.join(' | ') + '</span></p>\n                                </div>\n\n                                <div class="article-info-strip">\n                                    <div class="vote-div">\n                                        <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>\n                                        <span>' + article.price + '</span>\n                                    </div>\n                                    <div>\n                                        <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>\n                                        <span>' + article.stars + '</span>\n                                    </div>\n                                </div>\n\n                                <!-- body -->\n                                <div class="shop-photo-modal-body">\n                                    <div>\n                                        <p class="init-line-height about-shop-article">' + article.desc + '</p>\n                                    </div>\n                                 \n                                    <div class="actions">\n                                        <a href="#" class="btn-dark add-to-cart" data-toggle="tooltip" data-placement="top" title="Dodato u korupu!" data-animation="false">\n                                <i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        ';
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	articles: [{
		"id": 1,
		"name": "Corthay",
		"img": "./img/articles/cipele/c1-min.jpg",
		"price": "100",
		"stars": "10",
		"categories": ["cipele"],
		"desc": "Uživajući kao moderan cipelar, Corthai je preneo znanje preneto iz Compagnons, francuskog srednjovekovnog ceha, kako bi savršeno iskoristio umetničku obuću i koristio različite materijale, tehnike i oblike za ekskluzivni izbor obućarske cipele."
	}, {
		"id": 2,
		"name": "Salvatore Ferragamo",
		"img": "./img/articles/cipele/c2-min.jpg",
		"price": "100",
		"stars": "10",
		"categories": ["cipele"],
		"desc": "Salvatore Ferragamo je bio elitni brend za cipele nakon što je uhvatio oči holivudskih poznatih ličnosti 1920-ih. Posle tri generacije, lepota i kvalitet Salvatore Ferragamove ručno obučene cipele Italije i dalje su cenjeni i tražen od strane mnogih."
	}, {
		"id": 3,
		"name": "A Testoni",
		"img": "./img/articles/cipele/c3-min.jpg",
		"price": "200",
		"stars": "1",
		"categories": ["cipele"],
		"desc": "A. Testoni inovativno kombinuje drevne i savremene italijanske dizajnerske tehnike kako bi napravile cipele koje demonstriraju vrhunski talijanski zanat. Svaka cipela je striktno ručno izrađena bez oklevanja u korišćenju najkvalitetnijih materijala uz uključivanje detaljnih detalja o stilu."
	}, {
		"id": 4,
		"name": " Christian Louboutin",
		"img": "./img/articles/cipele/c4-min.jpg",
		"price": "140",
		"stars": "4",
		"categories": ["cipele"],
		"desc": "Ovaj popularni brend za cipele najizraženiji je svojim potpisom crvenom lakiranom podlogom, zajedno sa dizajnerskim dizajnom koji uključuje patentirane kože i narukvice. Obuća Christian Louboutin postoji kao jedan od najelegantnijih i trendovitih brendova cipela ove ere."
	}, {
		"id": 5,
		"name": "Bally",
		"img": "./img/articles/cipele/c5-min.jpg",
		"price": "400",
		"stars": "11",
		"categories": ["cipele"],
		"desc": "Kompanija Balli iz Švajcarske uključuje pametne boje i atletski stil u svojom obućom, sve dok održava sofisticiranu estetiku uz upotrebu visokokvalitetnih materijala, elegantan i sjajni dizajn."
	}, {
		"id": 6,
		"name": "Berluti",
		"img": "./img/articles/cipele/c6-min.jpg",
		"price": "450",
		"stars": "7",
		"categories": ["cipele"],
		"desc": "Od Okfordsa, Loafersa i Derbiesa, Berluti je izrađivao cipele za elegantnog čoveka od 1895. godine. Njegov izbor vrhunske i udobne kožne obuće je napravljen da daje najbolji utisak za te zvanične prilike ili za svakodnevnu casualnu odeću."
	}, {
		"id": 7,
		"name": "Brunello Cucinelli",
		"img": "./img/articles/cipele/c7-min.jpg",
		"price": "190",
		"stars": "2",
		"categories": ["cipele"],
		"desc": "Poznati kao \"kralj luksuza\", Brunello Cucinelli je u svoj brend postavio svoj luksuzni materijal i jednostavnu, ali klasičnu paletu boja. Inspirisan prelepim pejzažom Solomeo u Italiji, njegov brend je učinio puno divljenja svojim filozofskim pristupom dizajnu."
	}, {
		"id": 8,
		"name": "Bolvaint",
		"img": "./img/articles/cipele/c8-min.jpg",
		"price": "290",
		"stars": "6",
		"categories": ["cipele"],
		"desc": "Za nosioce klasičnih obuće, Bolvaint pokazuje izradu svoje marke svojim pažljivim odabirom kožnog materijala i oštrim okom za detalje. Stil Pariza se postiže svojim sofisticiranim dizajnom i elegantnim imidžom."
	}, {
		"id": 9,
		"name": "Crockett And Jones",
		"img": "./img/articles/cipele/c9-min.jpg",
		"price": "490",
		"stars": "10",
		"categories": ["cipele"],
		"desc": "Crockett & Jones su proizvođači nekih od najvećih ručno izrađenih engleskih obuće, izrađujući svoje cipele od najfinije kože kože sa vrhunskih tannerija Evrope. Pravo iz Northamptona, kvalitetan i vanvremenski stil naglašen je u procesu čuvanja čarapa."
	}, {
		"id": 10,
		"name": "Edward Green",
		"img": "./img/articles/cipele/c10-min.jpg",
		"price": "190",
		"stars": "12",
		"categories": ["cipele"],
		"desc": "Tradicija engleske elegancije dobro se drži bezvremenskim stilovima Edvarda Grina, koji su se rodili u Northamptonu 1890. godine. NJihova pažnja na klasične dizajne se i dalje može uočiti u njihovim vještačkim cipelama koje zajedno povezuju sofisticiranost i moderne trendove."
	}, {
		"id": 11,
		"name": "Giacometti",
		"img": "./img/articles/cipele/c11-min.jpg",
		"price": "190",
		"stars": "12",
		"categories": ["cipele"],
		"desc": "Brend Giacometti, osnovan u Italiji 1890. godine, izgrađen je proizvodnjom obuće sa jedinstvenom konstrukcijom i dizajnom, uključujući bezbrojne varijacije kože i prepoznatljive detalje koji pomažu u postavljanju imena Giacometti od svih ostalih."
	}, {
		"id": 12,
		"name": "Santoni",
		"img": "./img/articles/cipele/c12-min.jpg",
		"price": "190",
		"stars": "12",
		"categories": ["cipele"],
		"desc": "Brend Santoni je odličan primer istinske odličnosti italijanske čarape. Tradicija i inovacije su ključni elementi tehnikama craftinga, koji se pokreću modernim stavom s drevnim znanjem čine Santoni cipele ističući među modnim svetom."
	}, {
		"id": 13,
		"name": "Black Bay Bronze One",
		"img": "./img/articles/satovi/s1-min.jpg",
		"price": "1952",
		"stars": "10",
		"categories": ["satovi"],
		"desc": "Brojčanik i korona izrađeni su u specifičnoj khaki zelenoj nijansi dok narukvica od tkanine kompletira jedinstveni izgled. Inače, kompanija Tudor po drugi put učestvuje na renomiranoj Only Watch aukciji."
	}, {
		"id": 14,
		"name": "Calister",
		"img": "./img/articles/satovi/s2-min.jpg",
		"price": "851",
		"stars": "2",
		"categories": ["satovi"],
		"desc": "Elegantan časovnik dizajniran za pronicljivu žensku osobu. Dimenzionalno gledanje izlučuje skromne proporcije i meri 35mm k 8mm. Ono što ovaj sat čini tako atraktivnim jeste sjajno kućište od nerdjajuceg čelika 316L. Ova šarmantna karakteristika radi u savršenoj saglasnosti sa srebrnim biranjem i zlatnim satima / minutnim rukama. Ostale karakteristike uključuju diskretan prozor za datum (koji se nalazi u 3 sata) crni kožni remen, Svarovski kristalni markeri i Hesalit kristalni objektiv."
	}, {
		"id": 15,
		"name": "Miyota 82s0",
		"img": "./img/articles/satovi/s3-min.jpg",
		"price": "724",
		"stars": "3",
		"categories": ["satovi"],
		"desc": "Miyota 82s0 nudi čvrsto dizajniran savremeni automatski sat koji bi svakog arhitekte i inženjera trebalo da plače. Ovo je nova kompanija za čuvanje, koja koristi ime iz alata za merenje udaljenosti između dve strane objekta."
	}, {
		"id": 16,
		"name": "Rolex Syster Perpetual 67230",
		"img": "./img/articles/satovi/s4-min.jpg",
		"price": "798",
		"stars": "15",
		"categories": ["satovi"],
		"desc": "Sat od nerdjajuceg čelika sa finim okretnim okvirom motora (prečnik 25 mm). Crni brojčanik sa markerima. Jubilejna narukvica od nerdjajuceg čelika."
	}, {
		"id": 17,
		"name": "Rolex 16233",
		"img": "./img/articles/satovi/s5-min.jpg",
		"price": "447",
		"stars": "9",
		"categories": ["satovi"],
		"desc": "Sat od nerdjajuceg čelika sa finim okretnim okvirom motora (prečnik 35 mm). Crni brojčanik sa markerima. Jubilejna narukvica od nerdjajuceg čelika."
	}, {
		"id": 18,
		"name": "Relógios Jaragar",
		"img": "./img/articles/satovi/s6-min.jpg",
		"price": "290",
		"stars": "6",
		"categories": ["satovi"],
		"desc": "Kompletan kalendar i zaštitni mineralni kristalni prozor, kućište od legure, crni kožni remen. Nerđajući čelik i kron i dizajn posebnog biranja otkrivaju vašu moćnu tačku gledanja."
	}, {
		"id": 19,
		"name": "Yazole",
		"img": "./img/articles/satovi/s7-min.jpg",
		"price": "728",
		"stars": "12",
		"categories": ["satovi"],
		"desc": "Jednostavan u dizajnu, suptilan u stilu. Moda i moderan dizajn, pogodan za svaku priliku. Vodootporan: otporan na vodu od svakodnevnog života, ali ne za kupanje, plivanje, ronjenje itd. Najbolji izbor kao poklon za venčanje, godišnjicu, rođendan, Valentinovo i druge značajne dane. Veliki okrugli dvostruki dizajn ekrana, veoma lako čitljiv."
	}, {
		"id": 20,
		"name": "Ochstin Automatic",
		"img": "./img/articles/satovi/s8-min.jpg",
		"price": "859",
		"stars": "9",
		"categories": ["satovi"],
		"desc": "Uvezena automatska mehanička kretanja, veoma izdržljiva za upotrebu. Sa ručnim ležajima od 21 komada, prikazuje se luksuz sa malim ključem. Sapphire dizajn ogledala, otporan na ogrebotine, otporan na vodu. Dvostruki brod, vrlo poseban. 30 m vodootporna klasa, nema potrebe da brinete u kišnim danima. Poslovni stil, posebno pogodan za muškarce u poslovnoj prilici."
	}, {
		"id": 21,
		"name": "Patek Philippe",
		"img": "./img/articles/satovi/s9-min.jpg",
		"price": "777",
		"stars": "2",
		"categories": ["satovi"],
		"desc": "Patek Philippe smatra se najprestižnijim luksuznim časovničarima u industriji. Početkom 1839. godine u Ženevi kao džepni sat, kompanija Patek Philippe ima dugu i istoriju istorije gledanja, uključujući i prvu kompaniju koja je dodala hronograf, minutni repetitor, večni kalendar i ruku podijeljenih sekundi ručni sat. Klijenti Roial Patek Philippe-a su Prince Albert, Christian IKS, Hussein Kamel iz Egipta, Princeza Louise iz Danske, kraljica Viktorija i Victor Emmanuel III iz Italije..."
	}, {
		"id": 22,
		"name": "Corleone",
		"img": "./img/articles/satovi/s10-min.jpg",
		"price": "840",
		"stars": "12",
		"categories": ["satovi"],
		"desc": "Corleone L'orologio je osnovan u ograničnom čuvaru maschilea, jer je više element koji doprinosi definisanju lepote i uobičajenih stilova."
	}, {
		"id": 23,
		"name": "Weite",
		"img": "./img/articles/satovi/s11-min.jpg",
		"price": "821",
		"stars": "2",
		"categories": ["satovi"],
		"desc": "Tri mala ukrasna pod-biranja čine sat jedinstvenim. Kutija od nerdjajuceg čelika je čvrsta u strukturi i neprijatna za oštricu. Kožna satna traka je udobna za nošenje. Klasična kopčica pinova, pogodna za podešavanje."
	}, {
		"id": 24,
		"name": "Yazole 602a",
		"img": "./img/articles/satovi/s12-min.jpg",
		"price": "635",
		"stars": "7",
		"categories": ["satovi"],
		"desc": "Jednostavan u dizajnu, suptilan u stilu. Moda i moderan dizajn, pogodan za svaku priliku. Vodootporan: otporan na vodu od svakodnevnog života, ali ne za kupanje, plivanje, ronjenje itd. Najbolji izbor kao poklon za venčanje, godišnjicu, rođendan, Valentinovo i druge značajne dane. Veliki okrugli dvostruki dizajn ekrana, veoma lako čitljiv."
	}, {
		"id": 25,
		"name": "ZARA 2017",
		"img": "./img/articles/kosulje/k1-min.jpg",
		"price": "328",
		"stars": "7",
		"categories": ["kosulje"],
		"desc": "Ova španska kompanija je jedna od najneobičnijih razornih trgovaca na svetu. Ova kompanija osnovana je 1975. godine. Osnivač ove kompanije je Amancio Ortega i Rosalia Mera. Oni su stručnjaci u proizvodnji odjeće svjetske klase. Ova kompanija je kompanija brodskog broda pod posrednom grupom. Oni proizvode oko 10 000 dizajna svake godine i imaju ekspertizu u proizvodnji luksuznih linija za odeću."
	}, {
		"id": 26,
		"name": "Camisa de Vestir Hombre",
		"img": "./img/articles/kosulje/k2-min.jpg",
		"price": "303",
		"stars": "11",
		"categories": ["kosulje"],
		"desc": "Pamučna svetlo plava kosulja."
	}, {
		"id": 27,
		"name": "Paul Jones",
		"img": "./img/articles/kosulje/k12-min.jpg",
		"price": "484",
		"stars": "8",
		"categories": ["kosulje"],
		"desc": "Ova elegantna košulja je savršena za izlaske, posao, svakodnevnu varijantu, sve sezone i prilike."
	}, {
		"id": 28,
		"name": "Van Heusen",
		"img": "./img/articles/kosulje/k6-min.jpg",
		"price": "549",
		"stars": "7",
		"categories": ["kosulje"],
		"desc": "65% poliester, 35% pamuk. Obučene košulje imaju potpunu rukavu, potpunu grudi, konusno sečenje i tanji su u struku."
	}, {
		"id": 29,
		"name": "Tom's Ware",
		"img": "./img/articles/kosulje/k5-min.jpg",
		"price": "205",
		"stars": "1",
		"categories": ["kosulje"],
		"desc": "Slim fit, odgovara veličini, kvalitetnom tkaninom i izradom stila čini da se osećate dobro i udobno kada ga nosite."
	}, {
		"id": 30,
		"name": "Calvin Klein",
		"img": "./img/articles/kosulje/k4-min.jpg",
		"price": "476",
		"stars": "13",
		"categories": ["kosulje"],
		"desc": "Slim fit košulja sa konusnim rukavima, rukama sa višim rukama i tanji rezom na grudima i struku."
	}, {
		"id": 31,
		"name": "Versace",
		"img": "./img/articles/kosulje/k8-min.jpg",
		"price": "768",
		"stars": "7",
		"categories": ["kosulje"],
		"desc": "Obložena plava pamučna košulja sa dugim rukavima sa plutajućim ikonama zvezdica."
	}, {
		"id": 32,
		"name": "Versace black",
		"img": "./img/articles/kosulje/k7-min.jpg",
		"price": "764",
		"stars": "4",
		"categories": ["kosulje"],
		"desc": "Obložena crna pamučna košulja sa dugim rukavima sa plutajućim ikonama zvezdica."
	}, {
		"id": 33,
		"name": "Dickies",
		"img": "./img/articles/kosulje/k3-min.jpg",
		"price": "428",
		"stars": "8",
		"categories": ["kosulje"],
		"desc": "65% poliester / 35% pamuk. Radna košulja na prednjoj strani u opuštenoj ponudi sa dugim rukavima i džepovima sa džepovima sa dugmićima."
	}, {
		"id": 34,
		"name": "LOCALMODE",
		"img": "./img/articles/kosulje/k9-min.jpg",
		"price": "571",
		"stars": "10",
		"categories": ["kosulje"],
		"desc": "100% pamuk. Pogodno za sve vrste aktivnosti."
	}, {
		"id": 35,
		"name": "IZOD",
		"img": "./img/articles/kosulje/k11-min.jpg",
		"price": "633",
		"stars": "5",
		"categories": ["kosulje"],
		"desc": "SportFlek tehnologija omogućava tkanini da se prostiri za maksimalan komfor."
	}, {
		"id": 36,
		"name": "Goodthreads",
		"img": "./img/articles/kosulje/k10-min.jpg",
		"price": "309",
		"stars": "4",
		"categories": ["kosulje"],
		"desc": "Ova klasična, svestrana košulja pruža čist, zakačen izgled s posebnim pranjem za mekan osećaj i maksimalan komfor."
	}]
};

/***/ })
/******/ ]);