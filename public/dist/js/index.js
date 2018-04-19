/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(1);

	var Router = __webpack_require__(2);
	var Transition = __webpack_require__(6);

	var util = {
	    debounce: function debounce(fn, delay) {
	        var last = void 0;
	        return function () {
	            var ctx = this,
	                args = arguments;
	            clearTimeout(last);

	            last = setTimeout(function () {

	                fn.apply(ctx, args);
	            }, delay);
	        };
	    }
	};

	var app = {
	    init: function init() {
	        this.setRouter();

	        this.responsiveNav();
	        this.backTop();
	        this.toggleAside();

	        this.catalogue();
	    },
	    responsiveNav: function responsiveNav() {
	        var $header = $(".page_hd");

	        var $btn = $header.find(".btn-list"),
	            $nav = $header.find(".nav-responsive");
	        $btn.on("click", function () {
	            $nav.toggleClass("active");
	        });
	    },
	    toggleAside: function toggleAside() {
	        var $btn = $("#J_toggleSide"),
	            $aside = $(".page_sd"),
	            $main = $("#blog");

	        $btn.on("click", function () {
	            $aside.toggleClass("active");
	            $main.toggleClass("active");

	            $btn.toggleClass("close");
	        });

	        $btn.on("mouseover", function () {
	            $btn.addClass("hover");
	        }).on("mouseout", function () {
	            $btn.removeClass("hover");
	        });
	    },
	    backTop: function backTop() {
	        var $btn = $(".btn-top");

	        $(document).on("scroll", util.debounce(function () {
	            $(this).scrollTop() > 200 ? $btn.addClass("active") : $btn.removeClass("active");
	        }, 50));

	        $btn.on("click", function () {
	            $("html, body").animate({
	                scrollTop: 0
	            }, self.speed);
	        });
	    },
	    catalogue: function catalogue() {

	        var $title = $(".article_ct h2"),
	            $catalogueItem = $(".catalogue_item.lv1");

	        // 找到当前视窗内的内容
	        function setCurrentCatalogue() {
	            if (!isArticlePage()) {
	                return;
	            }

	            var i = void 0,
	                len = $title.length;

	            for (i = 0; i < len; ++i) {
	                var rectObject = $title[i].getBoundingClientRect();
	                if (rectObject.top > 0) {
	                    break;
	                }
	            }

	            i--;
	            if (i >= len) {
	                i = len - 1;
	            } else if (i < 0) {
	                i = 0;
	            }

	            $catalogueItem.removeClass("on").eq(i).addClass("on");
	        }

	        // todo 从Router暴露接口
	        function isArticlePage() {
	            var href = location.href;
	            return (/article\/.*?/.test(href)
	            );
	        }

	        // 初始化
	        setCurrentCatalogue();

	        var listen = util.debounce(function () {
	            setCurrentCatalogue();
	        }, 50);

	        $(document).on("scroll", listen);
	    },
	    setRouter: function setRouter() {
	        var _this = this;

	        var $main = $("#page_wrap");

	        var tpls = {
	            '/': '/views/_page/index.swig',
	            '/\\d+': '/views/_page/index.swig',
	            '/article/.*?': '/views/_page/article.swig',
	            '/archive': '/views/_page/archive.swig',
	            '/archive/.*?': '/views/_page/archive.swig',
	            '/tags': '/views/_page/tags.swig',
	            '/book': '/views/_page/book.swig',

	            // '/message': '/views/_page/message.swig',
	            '/friend': '/views/_page/friend.swig',
	            '/about': '/views/_page/about.swig',
	            '/version': '/views/_page/version.swig'
	        };

	        var router = new Router(tpls, $main, Transition.Loading);

	        router.run();

	        router.listen(function (item) {
	            _this.catalogue();
	        });

	        this.router = router;
	    }
	};

	app.init();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = window.jQuery;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var swig = __webpack_require__(3);
	var $ = __webpack_require__(1);

	var Router = function () {
	    /**
	     *
	     * @param tpls 模板配置文件
	     * @param el 页面容易元素
	     * @param transition 页面过渡效果
	     */
	    function Router(tpls, el, transition) {
	        _classCallCheck(this, Router);

	        this.tpls = tpls;

	        this.cache = {};

	        this.$main = el;

	        this.transition = transition;

	        this.cbs = [];

	        // todo 提供判断当前页面的接口
	    }

	    _createClass(Router, [{
	        key: "install",
	        value: function install(plugin) {
	            // todo 路由插件
	        }
	    }, {
	        key: "replaceUrl",
	        value: function replaceUrl(url) {
	            history.pushState({
	                url: url
	            }, null, url);
	        }
	    }, {
	        key: "getTpl",
	        value: function getTpl(href) {
	            var pageMap = this.tpls;
	            var page = pageMap[href];

	            if (!page) {
	                for (var key in pageMap) {
	                    if (pageMap.hasOwnProperty(key)) {
	                        var re = new RegExp("^" + key + "$");
	                        if (re.test(href)) {

	                            page = pageMap[key];
	                            break;
	                        }
	                    }
	                }
	            }

	            return page;
	        }
	    }, {
	        key: "setTitle",
	        value: function setTitle(title) {
	            $("title").text(title);
	        }
	    }, {
	        key: "render",
	        value: function render(htm) {
	            var $main = this.$main;

	            this.transition.in($main);

	            $main.html(htm);
	        }
	    }, {
	        key: "resetScrollTop",
	        value: function resetScrollTop() {
	            if (document.compatMode === "BackCompat") {
	                document.body.scrollTop = 0;
	            } else {
	                document.documentElement.scrollTop = 0;
	            }
	        }
	    }, {
	        key: "loadPage",
	        value: function loadPage(href) {
	            var _this = this;

	            var tpl = this.getTpl(href);

	            // 如果没有匹配路由，则按照普通链接跳转
	            if (!tpl) {
	                return true;
	            }

	            var $main = this.$main,
	                cache = this.cache;

	            this.transition.out($main);

	            this.replaceUrl(href);

	            var handler = [$.get("" + href)];

	            if (!cache[href]) {
	                // todo 决定只缓存模板还是缓存整个数据填充后的Html
	                handler.push($.get(tpl).then(function (res) {
	                    cache[href] = res;
	                }));
	            }

	            Promise.all(handler).then(function (res) {
	                var data = res[0],
	                    tpl = cache[href];

	                var htm = swig.render(tpl, { locals: data });

	                // 缓存模板

	                _this.render(htm);
	                _this.resetScrollTop();
	            });

	            // 阻止默认跳转
	            return false;
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            var self = this;

	            $(document).on("click", "a", function () {
	                var href = $(this).attr("href");

	                return self.change(href);
	            });

	            window.onpopstate = function (e) {
	                var href = e.state.url;

	                self.change(href);
	            };
	        }
	    }, {
	        key: "change",
	        value: function change(href) {
	            var _this2 = this;

	            this.cbs.forEach(function (cb) {
	                cb(_this2);
	            });

	            this.setTitle("橙红年代");
	            return this.loadPage(href);
	        }
	    }, {
	        key: "listen",
	        value: function listen(fn) {
	            if (typeof fn === 'function') {
	                this.cbs.push(fn);
	            }
	        }
	    }]);

	    return Router;
	}();

	module.exports = Router;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var swig = __webpack_require__(4);

	// 自定义过滤器
	var filters = __webpack_require__(5);

	for (var key in filters) {
	    swig.setFilter(key, filters[key]);
	}

	module.exports = swig;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = window.swig;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	// 自定义过滤器
	var filters = {
	    // 标签云
	    tagSize: function tagSize(num) {
	        var fontSize = "";

	        if (num <= 2) {
	            fontSize = "text-xs";
	        } else if (num > 2 && num <= 5) {
	            fontSize = "text-sm";
	        } else if (num > 5 && num <= 8) {
	            fontSize = "text-md";
	        } else {
	            fontSize = "text-lg";
	        }
	        return fontSize;
	    },
	    joinKey: function joinKey(content, key) {
	        var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";

	        return content.map(function (item) {
	            return item[key];
	        }).join(separator);
	    }
	};

	module.exports = filters;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 页面切换的过渡动画
	 * 每个动画对象需实现in 和 out 两个方法
	 */

	var $ = __webpack_require__(1);

	var transition = {
	    Horizontal: {
	        in: function _in($page) {
	            $page.removeClass("fadeOutRight").addClass("fadeInLeft").one('animationend', function () {
	                $(this).removeClass("fadeInLeft");
	            });
	        },
	        out: function out($page) {
	            $page.addClass("fadeOutRight");
	        }
	    },

	    Loading: {
	        in: function _in($page) {
	            var $load = $(".page_loading");
	            $load.hide();
	            $page.removeClass("fadeOut").addClass("fadeIn").one('animationend', function () {
	                $(this).removeClass("fadeIn");
	            });
	        },
	        out: function out($page) {
	            var $load = $(".page_loading");
	            $load.show();

	            $page.addClass("fadeOut");
	        }
	    }

	};

	module.exports = transition;

/***/ })
/******/ ]);