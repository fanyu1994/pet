(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"02ea":function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}))},"1e95":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("9808"));function i(t){return t&&t.__esModule?t:{default:t}}var a=function(){Promise.all([e.e("common/vendor"),e.e("components/myInput")]).then(function(){return resolve(e("08b3"))}.bind(null,e)).catch(e.oe)},u={data:function(){return{topList:[],scrollList:[],bottomList:[],showD:!1,linimg:"https://tempim-1256796114.cos-website.ap-shanghai.myqcloud.com/placeholder/300x240"}},components:{myInput:a},onLoad:function(){this.$store.dispatch("getUser")},onReady:function(){},created:function(){var t=this;o.default.slice(5,10).forEach((function(n){t.topList.push(n)})),this.scrollList=o.default,this.bottomList=o.default.slice(0,4)},onReachBottom:function(){var n=this,e=this.bottomList.length,i=o.default.length;e==i&&(this.showD=!0),t.showLoading({title:"加载中..."}),setTimeout((function(){n.bottomList=n.bottomList.concat(o.default.slice(e,e+4)),t.hideLoading()}),1e3)},methods:{toItem:function(n){t.showLoading({title:"跳转中。。。",mask:!1}),t.navigateTo({url:"/pages/item/item?id=".concat(n.id),success:function(){t.hideLoading()}})}}};n.default=u}).call(this,e("543d")["default"])},"7f29":function(t,n,e){"use strict";e.r(n);var o=e("1e95"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},8206:function(t,n,e){},"87f3":function(t,n,e){"use strict";(function(t){e("c507"),e("921b");o(e("66fd"));var n=o(e("f44e"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a93a:function(t,n,e){"use strict";var o=e("8206"),i=e.n(o);i.a},f44e:function(t,n,e){"use strict";e.r(n);var o=e("02ea"),i=e("7f29");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("a93a");var u,c=e("f0c5"),s=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,"7829a6ee",null,!1,o["a"],u);n["default"]=s.exports}},[["87f3","common/runtime","common/vendor"]]]);