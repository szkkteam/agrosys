webpackJsonp([7],{"./frontend/app/security/pages/Logout/Logout.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/react/index.js"),o=n.n(r),u=n("./node_modules/redux/es/index.js"),c=n("./node_modules/react-redux/es/index.js"),s=n("./frontend/app/actions.js"),i=n("./frontend/app/security/actions.js"),a=n("./frontend/app/utils/async/index.js");function f(e){"@babel/helpers - typeof";return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=b(e);if(t){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,n)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(c,o.a.Component);var t,n,r,u=d(c);function c(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),u.apply(this,arguments)}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.logout.trigger()}},{key:"render",value:function(){return null}}])&&p(t.prototype,n),r&&p(t,r),c}(),j=Object(c.connect)(function(e){return{}},function(e){return Object(s.b)({logout:i.d},e)}),g=Object(a.b)(n("./frontend/app/security/sagas/logout.js"));t.default=Object(u.d)(j,g)(y)},"./frontend/app/security/sagas/logout.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"KEY",function(){return a}),n.d(t,"logoutSaga",function(){return f});var r=n("./node_modules/redux-saga/es/effects.js"),o=n("./node_modules/connected-react-router/esm/index.js"),u=n("./frontend/app/routes.js"),c=n("./frontend/app/sagas.js"),s=n("./frontend/app/security/actions.js"),i=n("./frontend/app/security/api.js"),a="logout",f=Object(c.b)(s.d,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.a)(i.a.logout);case 2:return e.next=4,Object(r.b)(s.d.success());case 4:return e.next=6,Object(r.b)(Object(o.e)(u.b[u.a.DashboardHome].path));case 6:case"end":return e.stop()}},e)}));t.default=function(){return[Object(r.g)(s.d.TRIGGER,f)]}}});