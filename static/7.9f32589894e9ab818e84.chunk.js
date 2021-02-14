webpackJsonp([7],{"./frontend/app/security/pages/Login/Login.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/react/index.js"),a=n.n(r),o=n("./node_modules/react-helmet/lib/Helmet.js"),s=n.n(o),i=n("./node_modules/redux/es/index.js"),c=n("./node_modules/react-redux/es/index.js"),u=n("./node_modules/redux-form/es/reduxForm.js"),d=n("./node_modules/query-string/index.js"),l=n("./node_modules/styled-components/dist/styled-components.browser.esm.js"),m=n("./node_modules/react-intl/lib/index.js"),p=Object(m.c)({submitTitle:{id:"app.security.Login.Submit.title",defaultMessage:"Login"},submittingTitle:{id:"app.security.Login.Submit.progress",defaultMessage:"Logging in..."},fieldUsername:{id:"app.security.Login.Field.username",defaultMessage:"Email or Username"},fieldPassword:{id:"app.security.Login.Field.password",defaultMessage:"Password"},forgotPassword:{id:"app.security.Login.forgotPassword",defaultMessage:"Forgot password?"}}),f=n("./frontend/app/security/routes.js"),g=n("./frontend/app/security/actions.js"),b=n("./node_modules/@material-ui/core/esm/index.js"),j=n("./frontend/app/components/Nav/index.js"),y=n("./frontend/app/components/Form/index.js"),O=n("./frontend/app/utils/async/index.js");function x(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var w=Object(l.c)(b.Grid).withConfig({displayName:"Login__Container",componentId:"sc-1wu9cjy-0"})(["padding:15px 20px;"]),v=Object(l.c)(b.Button).withConfig({displayName:"Login__SubmitButton",componentId:"sc-1wu9cjy-1"})(["width:100%;"]),E=Object(l.c)(function(e){return a.a.createElement(j.a,e)}).withConfig({displayName:"Login__SupportLink",componentId:"sc-1wu9cjy-2"})(["font-size:0.75rem;line-height:38px;"]),_=Object(u.a)({form:"login"}),h=Object(c.connect)(function(e,t){return{initialValues:{redirect:Object(d.parse)(t.location.search).next||"/",email:null,password:null}}}),P=Object(O.b)(n("./frontend/app/security/sagas/login.js"));t.default=Object(i.d)(h,_,P)(function(e){e.error;var t=e.handleSubmit,n=e.submitting,r=e.pristine,o=(x(e,["error","handleSubmit","submitting","pristine"]),Object(m.e)()),i=o.formatMessage(n?p.submittingTitle:p.submitTitle);return a.a.createElement(a.a.Fragment,null,a.a.createElement(s.a,null,a.a.createElement("title",null,"Login")),a.a.createElement("form",{onSubmit:t(g.c)},a.a.createElement(w,{container:!0,spacing:3},a.a.createElement(y.d,{name:"redirect"}),a.a.createElement(b.Grid,{item:!0,xs:12},a.a.createElement(y.j,{name:"email",formProps:{fullWidth:!0},label:o.formatMessage(p.fieldUsername),autoFocus:!0})),a.a.createElement(b.Grid,{item:!0,xs:12},a.a.createElement(y.e,{name:"password",formProps:{fullWidth:!0},label:o.formatMessage(p.fieldPassword)}),a.a.createElement("div",null,a.a.createElement(E,{to:f.a.ForgotPassword,routeMap:f.b},a.a.createElement(m.a,p.forgotPassword)))),a.a.createElement(b.Grid,{item:!0,xs:12},a.a.createElement(v,{type:"submit",disabled:r,variant:"contained",color:"primary"},i)))))})},"./frontend/app/security/sagas/login.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"KEY",function(){return d}),n.d(t,"loginSaga",function(){return l});var r=n("./node_modules/redux-saga/es/effects.js"),a=n("./node_modules/connected-react-router/esm/index.js"),o=n("./frontend/app/farmApp/routes.js"),s=n("./frontend/app/sagas.js"),i=n("./frontend/app/security/actions.js"),c=n("./frontend/app/security/api.js");function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d="login",l=Object(s.a)(i.c,regeneratorRuntime.mark(function e(t){var n,s,d,l,m,p,f;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.b[o.a.DashboardOverview].toPath(),s=t.redirect,d=void 0===s?n:s,l=u(t,["redirect"]),e.next=4,Object(r.a)(c.a.login,l);case 4:return m=e.sent,p=m.token,f=m.user,e.next=9,Object(r.b)(i.c.success({token:p,user:f}));case 9:return e.next=11,Object(r.b)(Object(a.e)(d));case 11:case"end":return e.stop()}},e)}));t.default=function(){return[Object(r.g)(i.c.TRIGGER,l)]}}});