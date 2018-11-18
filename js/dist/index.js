// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/modules/modals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function () {
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

exports.default = _default;
},{}],"src/modules/counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getTimeRemaining(endtime) {
  var total = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(total / 1000 % 60);
  var minutes = Math.floor(total / 1000 / 60 % 60);
  var hours = Math.floor(total / (1000 * 60 * 60) % 24);
  var days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total: total,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
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

var _default = initializeClock;
exports.default = _default;
},{}],"src/modules/helpers/url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function () {
  var params = null; //parse url get parameters to array of js key: value objects

  function _parseUrl() {
    params = location.search == '' ? [] : location.search.slice(1).split('&').map(function (e) {
      return {
        key: e.split('=')[0],
        value: e.split('=')[1]
      };
    });
  } //parse js array to query string and push state to it's value


  function _createQueryString() {
    return (params.length > 0 ? '?' : '') + params.map(function (_ref) {
      var key = _ref.key,
          value = _ref.value;
      return key + '=' + value;
    }).join('&');
  }

  function _updateUrl() {
    window.history.pushState('', '', location.pathname + _createQueryString());
  }

  return {
    getParam: function getParam(str) {
      _parseUrl();

      var param = params.find(function (_ref2) {
        var key = _ref2.key;
        return key === str;
      });
      return param ? param.value : null;
    },
    setParam: function setParam(param, value) {
      _parseUrl();

      var isFound = false; //look for param, if found update, if not create new

      params = params.map(function (currentParam) {
        if (currentParam.key === param) {
          currentParam.value = value;
          isFound = true;
        }

        return currentParam;
      });

      if (!isFound) {
        params.push({
          key: param,
          value: value
        });
      }

      _updateUrl();
    },
    removeParam: function removeParam(str) {
      _parseUrl();

      params = params.filter(function (_ref3) {
        var key = _ref3.key;
        return key !== str;
      });

      _updateUrl();
    }
  };
}();

exports.default = _default;
},{}],"src/modules/cart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _article = _interopRequireDefault(require("./article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sum = [function (a, b) {
  return a + b;
}, 0];

var _default = function () {
  //main state
  var items = [];
  var isNotificationShowing = false;
  var isPopoverCartShowing = false; //cache DOM

  var $articles = $('.cart tbody');
  var $total = $('.total-price');
  var $navItemsCount = $('.cart-items-count');
  var $popoverCart = $('.popover-cart');
  var $nofitication = $('.cart-notification');
  var $cacheOutFrom = $('.cart').find('.cache-out'); // sync local state with localstorage

  function _syncWithLocalStorage() {
    localStorage.setItem('markorusic_webstore_cart_items', JSON.stringify(items));
  } //remove all items from cart


  function _emtpyCart() {
    items = [];

    _syncWithLocalStorage();
  }

  function _getTotalPrice() {
    var _items$map;

    return (_items$map = items.map(function (_ref) {
      var count = _ref.count,
          price = _ref.price;
      return count * price;
    })).reduce.apply(_items$map, sum);
  }

  function _getTotalCount() {
    var _items$map2;

    return (_items$map2 = items.map(function (_ref2) {
      var count = _ref2.count;
      return count;
    })).reduce.apply(_items$map2, sum);
  } //render item count on navigation


  function _renderCount() {
    $navItemsCount.text("(".concat(_getTotalCount(), ")"));
  } //render total price of cart items


  function _renderTotalPrice() {
    $total.text(_getTotalPrice());
  } //render full cart


  function _renderCart() {
    $articles.html('');
    items.forEach(function (item, i) {
      return _article.default.init(item, 'table-view', $articles, i + 1);
    });

    _renderTotalPrice();
  } //render cart popover


  function _renderPopoverCart() {
    isPopoverCartShowing = true;
    $popoverCart.find('tbody').html('');
    items.slice(0, 4).forEach(function (item, i) {
      _article.default.init(item, 'popover-table-view', $popoverCart.find('tbody'), i + 1);
    });
    if (items.length > 4) $popoverCart.find('tbody').append("<tr><td class=\"mt\" colspan=\"4\"><a href=\"/korpa.php\" style=\"color: #fcca39; font-size: 14px;\">Pogledaj sve...</a></td><tr>");

    _renderTotalPrice();

    $popoverCart.show('fast');

    _bindClosingEvent($popoverCart, 'popover-cart');
  } //render nofitication when user adds something to cart


  function _notify() {
    if (!isPopoverCartShowing) {
      $nofitication.show('fast');
      $nofitication.find('.show-popover-cart').off().on('click', function (e) {
        e.preventDefault();
        $nofitication.fadeOut(_renderPopoverCart);
      });

      _bindClosingEvent($nofitication, 'notification');

      isNotificationShowing = true;
    } else {
      _renderPopoverCart();
    }
  } //bind closing event on passed element


  function _bindClosingEvent(el, type) {
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
        color: 'black',
        fontSize: '10px'
      }).text('Molimo Vas da sacekate...');
      setTimeout(function () {
        $('#main-row').html("\n\t\t\t\t\t<div class=\"col-12 text-center\">\n\t\t\t\t\t\t<h3 class=\"text-center font-25\">Vasa narudzbina je poslata, uskoro cete dobiti obavestenje!</h3>\n\t\t\t\t\t\t<p>(Ovo je samo demo sajt, narudzbina nije poslata nigde.)</p>\n\t\t\t\t\t</div>\n\t\t\t\t");

        _emtpyCart();

        _renderCount();
      }, 1500);
    }
  } // triggers on cart page if cart is empty


  function _renderEmptyCart() {
    $('#main-row').html("\n\t\t\t<div class=\"col-12\">\n\t\t\t\t<h3 class=\"text-center font-25\">Vasa korpa je prazna, <a href=\"/\">ovde</a> mozete pogledati nase proizvode.</h3>\n\t\t\t</div>\n\t\t");
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
        items.push(_objectSpread({}, item, {
          count: 1
        }));
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

exports.default = _default;
},{"./article":"src/modules/article.js"}],"src/modules/templates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  article: function article(_ref) {
    var img = _ref.img,
        price = _ref.price,
        stars = _ref.stars,
        name = _ref.name;
    return "\n    <div class=\"store-item-wrapper\">\n        <article class=\"store-articles-list-item\"\n                style=\"background-image: url('".concat(img, "');\">\n            <div class=\"cpli-overlay\"><!-- class overlay --></div>\n            <div class=\"cpli-content\">\n                <div class=\"article-info-strip\">\n                    <div>\n                        <a href=\"#\"><i class=\"fa fa-eur\" aria-hidden=\"true\"></i></a>\n                        <span>").concat(price, "</span>\n                    </div>\n                    <div>\n                        <a href=\"#\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i></a>\n                        <span>").concat(stars, "</span>\n                    </div>\n                </div>\n                <div class=\"text-center store-article-info\">\n                    <p class=\"font-16\">").concat(name, "</p>\n                    <a href=\"#\" class=\"btn-white add-to-cart\">\n                        <i class=\"fa fa-cart-plus font-15\" aria-hidden=\"true\"></i> | <span class=\"content\">Dodaj u korpu</span></a>\n                </div>\n            </div>\n        </article>\n    </div>\n    ");
  },
  articleTr: function articleTr(_ref2, num) {
    var img = _ref2.img,
        count = _ref2.count,
        name = _ref2.name,
        price = _ref2.price;
    return "\n    <tr>\n        <td>#".concat(num, "</td>\n        <td class=\"rl-avatar-td\">\n            <a href=\"#\">\n                <div class=\"article-avatar\"\n                    style=\"background-image: url('").concat(img, "');\"></div>\n            </a>\n        </td>\n        <td>\n            <span>\n                ").concat(name, "\n            </span>\n        </td>\n        <td>").concat(count, "</td>\n        <td>").concat(price * count, "</td>\n        <td>\n            <a href=\"#\" class=\"remove-form-cart btn btn-danger-btn-sm\"><i class=\"fa fa-times\"></i></a>\n        </td>\n    </tr>\n    ");
  },
  articleTrPopover: function articleTrPopover(_ref3) {
    var img = _ref3.img,
        name = _ref3.name,
        count = _ref3.count,
        price = _ref3.price;
    return "\n    <tr>\n        <td>\n            <a href=\"#\">\n                <div class=\"article-avatar\" style=\"background-image: url('".concat(img, "');\"></div>\n            </a>\n        </td>\n        <td>").concat(name, "</td>\n        <td>").concat(count, "</td>\n        <td>").concat(price * count, "</td>\n    </tr>\n    ");
  },
  articleModal: function articleModal(_ref4) {
    var img = _ref4.img,
        name = _ref4.name,
        count = _ref4.count,
        price = _ref4.price,
        desc = _ref4.desc,
        stars = _ref4.stars,
        categories = _ref4.categories;
    return "\n    <div class=\"modal-mask shop-photo-modal\" id=\"article-photo-modal\" style=\"display: none;\">\n        <div class=\"container\">\n            <div class=\"modal-wrapper\">\n                <div class=\"modal-container\">\n                    <div class=\"flex-space-around-res\">\n                        <a class=\"top-right\" href=\"#\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a>\n                        <div class=\"cpm-bg\">\n                            <img src=\"".concat(img, "\" alt=\"").concat(desc, "\" class=\"img-fluid\">\n                        </div>\n\n                        <div class=\"cpm-bg-fff p-20\">\n                            <div class=\"modal-body\">\n\n                                <!-- hdr -->\n                                <div class=\"shop-photo-modal-header\">\n                                    <div class=\"hdr-wrapper\">\n                                        <h2>").concat(name, "</h2>                                        \n                                    </div>\n\n                                    <!-- Vote strip -->\n                                    <p class=\"article-categories\">Katogirije: <span>").concat(categories.join(' | '), "</span></p>\n                                </div>\n\n                                <div class=\"article-info-strip\">\n                                    <div class=\"vote-div\">\n                                        <a href=\"#\"><i class=\"fa fa-eur\" aria-hidden=\"true\"></i></a>\n                                        <span>").concat(price, "</span>\n                                    </div>\n                                    <div>\n                                        <a href=\"#\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i></a>\n                                        <span>").concat(stars, "</span>\n                                    </div>\n                                </div>\n\n                                <!-- body -->\n                                <div class=\"shop-photo-modal-body\">\n                                    <div>\n                                        <p class=\"init-line-height about-shop-article\">").concat(desc, "</p>\n                                    </div>\n                                \n                                    <div class=\"actions\">\n                                        <a href=\"#\" class=\"btn-dark add-to-cart\">\n                                <i class=\"fa fa-cart-plus font-15\" aria-hidden=\"true\"></i> | <span class=\"content\">Dodaj u korpu</span></a>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        ");
  }
};
exports.default = _default;
},{}],"src/modules/article.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cart = _interopRequireDefault(require("./cart"));

var _templates = _interopRequireDefault(require("./templates"));

var _url = _interopRequireDefault(require("./helpers/url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function () {
  //state
  var article = null; //cahce DOM

  var $modal = null;
  var $domElement = null;
  var $root = null; //private methods

  function _addToCart(article, $btn, event) {
    event.preventDefault();
    event.stopPropagation();

    _cart.default.add(article);

    if ($btn) {
      $btn.tooltip('show');
    }
  }

  function _removeFromCart(articleId, event) {
    event.preventDefault();
    event.stopPropagation();

    _cart.default.remove(articleId);
  }

  function _openLightBox(article, event) {
    if (event) {
      event.preventDefault();
    }

    $('body').css('overflow', 'hidden').append(_templates.default.articleModal(article));
    $modal = $('#article-photo-modal');
    $modal.show();

    _bindModalEvents(article);

    _url.default.setParam('articleId', article.id);
  }

  function _closeLightBox(event) {
    event.preventDefault();
    $modal.remove();
    $modal = null;
    $('body').css('overflow-y', 'scroll');

    _url.default.removeParam('articleId');
  }

  function _bindModalEvents(article) {
    //stop event propagation on all child elements(don't close modal on children click)
    $modal.children().on('click', function (event) {
      return event.stopPropagation();
    }); //closing events

    $modal.find('.fa-times').on('click', _closeLightBox);
    $modal.on('click', _closeLightBox); //add article to cart event

    $modal.find('.add-to-cart').on('click', _addToCart.bind(this, article, $modal.find('.add-to-cart')));
  } //public methods


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

      switch (type) {
        case 'box-view':
          template = _templates.default.article(article);
          break;

        case 'table-view':
          template = _templates.default.articleTr(article, num);
          break;

        case 'popover-table-view':
          template = _templates.default.articleTrPopover(article, num);
          break;

        default:
          throw new Error("Invalid type: ".concat(type));
          break;
      }

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
      if (type == 'box-view') {
        $domElement.on('click', _openLightBox.bind(this, article));
        $domElement.find('.add-to-cart').on('click', _addToCart.bind(this, article, $domElement.find('.add-to-cart')));
      } else if (type == 'table-view') $domElement.find('.remove-form-cart').on('click', _removeFromCart.bind(this, article.id));
    }
  };
}();

exports.default = _default;
},{"./cart":"src/modules/cart.js","./templates":"src/modules/templates.js","./helpers/url":"src/modules/helpers/url.js"}],"src/modules/helpers/mockUpData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
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
exports.default = _default;
},{}],"src/modules/articles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(require("./helpers/url"));

var _article = _interopRequireDefault(require("./article"));

var _mockUpData = _interopRequireDefault(require("./helpers/mockUpData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function () {
  //cache DOM
  var $root = $('.store-articles-list');
  var $sort = $root.find('ul li a');
  var $articles = $root.find('.articles-row');
  var $search = $root.find('.search-articles-by-name').find('input[type="text"]');
  var state = {
    items: [],
    itemsCopy: []
  };

  function _search(event) {
    var value = event.target.value;
    state.items = state.itemsCopy.filter(function (_ref) {
      var name = _ref.name;
      return name.toLowerCase().includes(value);
    });

    _render();
  }

  function _getArticleData(type) {
    var articles = _mockUpData.default.articles;

    if (type === 'sve') {
      return articles;
    }

    return articles.filter(function (_ref2) {
      var categories = _ref2.categories;
      return categories.includes(type);
    });
  }

  function _render() {
    $articles.html('');
    state.items.forEach(function (item) {
      return _article.default.init(item, 'box-view', $articles);
    });
  }

  function _bindEvents() {
    $sort.off();
    $sort.on('click', function (event) {
      event.preventDefault();
      var filter = $(event.target).data().sort;

      _url.default.setParam('filter', filter);

      _init();
    });
  }

  function _init() {
    var filterType = _url.default.getParam('filter') || 'cipele';
    state.items = _getArticleData(filterType);
    state.itemsCopy = _toConsumableArray(state.items); //set active tab

    $sort.removeClass('sb-active');
    $sort.parent().find("[data-sort='".concat(filterType, "']")).addClass('sb-active'); //empty search input

    $search.val('');

    _render();

    _bindEvents();
  } //tell article module to show specific article if articleId get param is passed


  function _showActiveArticle() {
    var activeArticleId = Number(_url.default.getParam('articleId'));

    if (activeArticleId) {
      var activeArticle = state.items.find(function (_ref3) {
        var id = _ref3.id;
        return id === activeArticleId;
      });

      if (activeArticle) {
        return _article.default.showArticle(activeArticle);
      }

      alert('Proizvod nije pronadjen!');
      return _url.default.removeParam('articleId');
    }

    return _url.default.removeParam('articleId');
  }

  return {
    init: function init() {
      _init();

      _showActiveArticle();

      $search.on('keyup', _search);
    }
  };
}();

exports.default = _default;
},{"./helpers/url":"src/modules/helpers/url.js","./article":"src/modules/article.js","./helpers/mockUpData":"src/modules/helpers/mockUpData.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modals = _interopRequireDefault(require("./modules/modals"));

var _counter = _interopRequireDefault(require("./modules/counter"));

var _articles = _interopRequireDefault(require("./modules/articles"));

var _cart = _interopRequireDefault(require("./modules/cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = {
  init: function init() {
    $(function () {
      var url = window.location.pathname;
      var fileName = url.substring(url.lastIndexOf('/') + 1);
      $('a[href="' + fileName + '"]').parent().addClass('active');

      _modals.default.init([['#hero-share-store', '#share-store-modal'], ['.open-login-modal', '#login-modal'], ['.open-register-modal', '#register-modals']]);

      $('button').not('.submit-cart').on('click', function (e) {
        return e.preventDefault();
      });

      if (url == '/' || url == '/index.php') {
        (0, _counter.default)('.shop-counter');

        _articles.default.init();
      }

      _cart.default.init();

      if (url == '/korpa.php') {
        _cart.default.render();

        _cart.default.initCacheOutForm();
      }
    });
  }
};
var _default = app;
exports.default = _default;
},{"./modules/modals":"src/modules/modals.js","./modules/counter":"src/modules/counter.js","./modules/articles":"src/modules/articles.js","./modules/cart":"src/modules/cart.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./src/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.init();
},{"./src/app":"src/app.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41906" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map