!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=window.jQuery},function(e,t){e.exports=window.System},function(e,t){function n(e,t){var n=new RegExp("([\\w\\d\\_\\-]+)=([^\\s\\&"+(t||"")+"]+)","ig"),i={};return e.replace(n,function(e,t,n){i[t]=n}),i}var i=function(){var e,t,i=navigator.userAgent;if(/Android|iPod|iPhone|Windows\s*Phone|Mobile|meizu|lephone|xiaomi|mui|coolpad|zte|huawei/i.test(i))if(/\sQQ\/\d|QZone/i.test(i))e="qq";else if(/MicroMessenger/i.test(i)){e=(t=n(window.location.href))&&1==t._wxjs||"miniprogram"===window.__wxjs_environment?"miniprogram":"wx"}else e=/Weibo/i.test(i)?"weibo":"m";else e="pc";return e}();e.exports={debounce:function(e,t){var n;return function(){var i=this,o=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(i,o)},t)}},getParams:n,pageType:i}},function(e,t,n){function i(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n(11);var o=n(1),r=n(2);Promise.all([o.import("jquery"),o.import("swig")]).then(function(e){i(e);console.clear(),console.log("\n%c Shymean's Blog%cv0.5.1%c\n\n","padding: 8px; background: #333; font-family: 'Sitka Heading'; font-weight: bold; font-size: large; color: white;","padding: 8px; background: #999; font-family: 'Sitka Text'; font-size: large; color: #eee;",""),window.addEventListener("load",function(){console.log("页面加载完毕消耗了".concat(Math.round(100*performance.now())/100,"ms"))}),n(4).init(),"pc"===r.pageType&&o.import("L2Dwidget").then(function(){L2Dwidget.init({log:!1,debug:!1,model:{jsonPath:"https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json"},display:{position:"left"},react:{opacity:.5}})})})},function(e,t,n){var i=n(0),o=n(5),r=n(9),a=n(10),s=n(2),c={init:function(){this.setRouter(),this.responsiveNav(),this.backTop(),this.toggleAside(),this.catalogue(),a.init()},responsiveNav:function(){var e=i(".page_hd"),t=e.find(".btn-list"),n=e.find(".nav-responsive");t.on("click",function(){n.toggleClass("active")})},toggleAside:function(){var e=i("#J_toggleSide"),t=i(".page_sd"),n=i("#blog");e.on("click",function(){t.toggleClass("active"),n.toggleClass("active"),e.toggleClass("close")}),e.on("mouseover",function(){e.addClass("hover")}).on("mouseout",function(){e.removeClass("hover")})},backTop:function(){var e=i(".btn-top");i(document).on("scroll",s.debounce(function(){i(this).scrollTop()>200?e.addClass("active"):e.removeClass("active")},50)),e.on("click",function(){i("html, body").animate({scrollTop:0},self.speed)})},catalogue:function(){var e=i(".article_ct h2"),t=i(".catalogue_item.lv1");function n(){if(n=location.href,/article\/.*?/.test(n)){var n,i,o=e.length;for(i=0;i<o;++i){if(e[i].getBoundingClientRect().top>0)break}--i>=o?i=o-1:i<0&&(i=0),t.removeClass("on").eq(i).addClass("on")}}n();var o=s.debounce(function(){n()},50);i(document).on("scroll",o)},setRouter:function(){var e=this,t=i("#page_wrap"),n=new o({"/":"/view/index.swig","/\\d+":"/view/index.swig","/article/.*?":{path:"/view/article.swig",success:function(){a.init()}},"/archive":"/view/archive.swig","/archive/.*?":"/view/archive.swig","/tags":"/view/tags.swig","/book":"/view/book.swig","/friend":"/view/friend.swig","/about":"/view/about.swig","/version":"/view/version.swig","/demo":"/view/demo.swig","/message":{path:"/view/message.swig",success:function(){a.init()}}},t,r.Loading);n.run(),n.listen(function(t){e.catalogue()}),this.router=n}};e.exports=c},function(e,t,n){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=n(6),r=n(0),a=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tpls=t,this.cache={},this.$main=n,this.transition=i,this.cbs=[],this.currentUrl=""}var t,n,a;return t=e,(n=[{key:"install",value:function(e){}},{key:"replaceUrl",value:function(e){history.pushState({url:e},null,e)}},{key:"getTpl",value:function(e){var t=this.tpls,n=t[e];if(!n)for(var i in t){if(t.hasOwnProperty(i))if(new RegExp("^".concat(i,"$")).test(e)){n=t[i];break}}return n}},{key:"setTitle",value:function(e){r("title").text(e)}},{key:"render",value:function(e){var t=this.$main;this.transition.in(t),t.html(e)}},{key:"resetScrollTop",value:function(){window.scrollTo(0,0)}},{key:"loadPage",value:function(e){var t=this,n=this.getTpl(e);if(!n)return!0;if(this.currentUrl===e)return!1;this.currentUrl=e;var i=this.$main,a=this.cache;this.transition.out(i),this.replaceUrl(e);var s=[r.get("".concat(e),{async:!0})],c=function(){};return n.success&&(c=n.success,n=n.path),a[e]||s.push(r.get(n).then(function(t){a[e]=t})),Promise.all(s).then(function(n){var i=n[0],r=a[e],s=o.render(r,{locals:i});t.render(s),t.resetScrollTop(),c()}),!1}},{key:"run",value:function(){var e=this;r(document).on("click","a",function(){var t=r(this).attr("href");return e.change(t)}),window.onpopstate=function(t){var n=t.state.url;e.change(n)}}},{key:"change",value:function(e){var t=this;return this.cbs.forEach(function(e){e(t)}),this.setTitle("橙红年代"),this.loadPage(e)}},{key:"listen",value:function(e){"function"==typeof e&&this.cbs.push(e)}}])&&i(t.prototype,n),a&&i(t,a),e}();e.exports=a},function(e,t,n){var i=n(7),o=n(8);for(var r in o)i.setFilter(r,o[r]);e.exports=i},function(e,t){e.exports=window.swig},function(e,t){let n={tagSize(e){let t="";return t=e<=2?"text-xs":e>2&&e<=5?"text-sm":e>5&&e<=8?"text-md":"text-lg"},joinKey:(e,t,n=",")=>e.map(e=>e[t]).join(n),currentYear:e=>(new Date).getFullYear()};e.exports=n},function(e,t,n){var i=n(0),o={Horizontal:{in:function(e){e.removeClass("fadeOutRight").addClass("fadeInLeft").one("animationend",function(){i(this).removeClass("fadeInLeft")})},out:function(e){e.addClass("fadeOutRight")}},Loading:{in:function(e){i(".page_loading").hide(),e.removeClass("fadeOut").addClass("fadeIn").one("animationend",function(){i(this).removeClass("fadeIn")})},out:function(e){i(".page_loading").show(),e.addClass("fadeOut")}}};e.exports=o},function(e,t,n){function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var a,s=e[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==s.return||s.return()}finally{if(o)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var o=n(1);e.exports={init:function(){Promise.all([o.import("av"),o.import("Valine")]).then(function(e){var t=i(e,2);t[0];new t[1].default({el:"#vcomments",appId:"J9BV8j1TlKO7MHkO6r1awhCA-gzGzoHsz",appKey:"m06FfscybDkLncEygOdxU2gb",placeholder:"说点什么吧...",avatar:"",path:window.location.pathname})})}}},function(e,t){}]);