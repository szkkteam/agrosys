webpackJsonp([11],{"./frontend/app/farmApp/resource/worker/pages/WorkerList/WorkerList.js":function(e,r,n){"use strict";function t(){return t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},t.apply(this,arguments)}function a(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}function o(){var e=l(["\n    flex-grow: 1;\n"]);return o=function(){return e},e}function s(){var e=l(["\n    display: flex;\n"]);return s=function(){return e},e}function l(e,r){return r||(r=e.slice(0)),e.raw=r,e}function m(){return m=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},m.apply(this,arguments)}function i(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}function d(){var e=u(["\n    flex-grow: 1;\n"]);return d=function(){return e},e}function c(){var e=u(["\n    display: flex;\n"]);return c=function(){return e},e}function u(e,r){return r||(r=e.slice(0)),e.raw=r,e}function p(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,t)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?p(Object(n),!0).forEach(function(r){h(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function h(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function g(){return g=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},g.apply(this,arguments)}function b(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function y(){var e=O(["\n    padding: 10px 20px;\n"]);return y=function(){return e},e}function j(){var e=O(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"]);return j=function(){return e},e}function O(e,r){return r||(r=e.slice(0)),e.raw=r,e}function v(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}function P(){var e=M(["\n    height: 100%;\n"]);return P=function(){return e},e}function M(e,r){return r||(r=e.slice(0)),e.raw=r,e}Object.defineProperty(r,"__esModule",{value:!0});var R=n("./node_modules/react/index.js"),w=n.n(R),E=n("./node_modules/react-helmet/lib/Helmet.js"),k=n.n(E),x=n("./node_modules/react-intl/lib/index.js"),T=Object(x.c)({title:{id:"app.farmApp.worker.WorkerList.title",defaultMessage:"Workers"}}),A=n("./node_modules/styled-components/dist/styled-components.browser.esm.js"),W=n("./node_modules/react-router-dom/esm/react-router-dom.js"),_=Object(x.c)({tableTitle:{id:"app.farmApp.worker.WorkerTable.Table.title",defaultMessage:"Workers - database"},addNewTitle:{id:"app.farmApp.worker.WorkerTable.WorkerAddButton.title",defaultMessage:"Add new"}}),G=(n("./node_modules/prop-types/index.js"),n("./frontend/app/components/index.js")),N=n("./node_modules/@material-ui/core/esm/index.js"),L=n("./frontend/app/components/Table/index.js"),D=n("./frontend/app/utils/hooks/index.js"),B=Object(A.b)(N.Grid)(s()),C=A.b.div(o()),H=[{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"},{name:"Person name",role:"Manager",email:"user1@user.com",phone:"+36-30/333333",address:"9999 Random city, random street 2"}],S=function(e){var r=e.height,n=a(e,["height"]),o=(Object(x.e)(),Object(R.useRef)(null)),s=Object(D.a)(r,o,542),l=[{title:"Role",field:"role"},{title:"Name",field:"name"},{title:"E-mail",field:"email"},{title:"Phone",field:"phone"},{title:"Address",field:"address",hidden:!0}];return w.a.createElement(L.a,{columns:l},w.a.createElement(L.e,{ref:o,title:_.tableTitle,gridProps:{justify:"flex-end"}},w.a.createElement(N.Grid,{container:!0,justify:"flex-end"},w.a.createElement(B,{item:!0,xs:9},w.a.createElement(C,null),w.a.createElement(G.l,{title:_.addNewTitle})),w.a.createElement(N.Grid,{item:!0,xs:3}))),w.a.createElement(L.b,t({height:s,data:H},n)))};S.propTypes={};var q=S,z=Object(x.c)({tableTitle:{id:"app.farmApp.worker.RoleTable.Table.title",defaultMessage:"Worker - Roles"},addNewTitle:{id:"app.farmApp.worker.RoleTable.AddButton.title",defaultMessage:"Add new"}}),F=Object(A.b)(N.Grid)(c()),J=A.b.div(d()),I=[{title:"Manager",isActive:!0},{title:"Admin",isActive:!0},{title:"Operator",isActive:!0},{title:"Old role",isActive:!1}],K=function(e){var r=e.height,n=i(e,["height"]),t=(Object(x.e)(),Object(R.useRef)(null)),a=Object(D.a)(r,t,542),o=[{title:"Name",field:"title"},{title:"Active",field:"isActive",type:"boolean"}];return w.a.createElement(L.a,{columns:o},w.a.createElement(L.e,{ref:t,title:z.tableTitle,gridProps:{justify:"flex-end"}},w.a.createElement(N.Grid,{container:!0,justify:"flex-end"},w.a.createElement(F,{item:!0,xs:9},w.a.createElement(J,null),w.a.createElement(G.l,{title:z.addNewTitle})),w.a.createElement(N.Grid,{item:!0,xs:3}))),w.a.createElement(L.b,m({height:a,data:I},n)))};K.propTypes={};var Q=K,U=Object(x.c)({left:{id:"app.farmApp.worker.WorkerLayout.WorkerTab.title",defaultMessage:"Workers"},right:{id:"app.farmApp.worker.WorkerLayout.RoleTab.title",defaultMessage:"Roles"}}),V=n("./frontend/app/utils/route.js"),X=(A.b.div(j()),Object(A.b)(function(e){return w.a.createElement(G.r,e)})(y())),Y=function(e){b(e);var r=Object(R.useContext)(G.c),n=r.contentHeight;return console.debug("Worker height: ",n),w.a.createElement(w.a.Fragment,null,w.a.createElement(V.b,{path:"#workers",component:function(e){return w.a.createElement(q,g({height:n},e))}}),w.a.createElement(V.b,{path:"#roles",component:function(e){return w.a.createElement(Q,g({height:n},e))}}),w.a.createElement(V.b,{path:"",component:function(e){var r=e.location;return w.a.createElement(W.c,{to:f(f({},r),{},{hash:"#workers"})})}}))},Z=function(e){b(e);var r=Object(x.e)(),n=Object(W.g)(),t=[{value:"#workers",title:r.formatMessage(U.left)},{value:"#roles",title:r.formatMessage(U.right)}];return w.a.createElement(G.b,null,w.a.createElement(X,{value:n.hash||"#workers",orientation:"horizontal"},t&&t.map(function(e,r){return w.a.createElement(G.q,{key:r,to:f(f({},n),{},{hash:e.value}),value:e.value,label:e.title})})),w.a.createElement(Y,null))};Z.propTypes={};var $=Z,ee=A.b.div(P());r.default=function(e){var r=(e.history,e.match,v(e,["history","match"]),Object(x.e)());return w.a.createElement(ee,null,w.a.createElement(k.a,null,w.a.createElement("title",null,r.formatMessage(T.title))),w.a.createElement($,null))}}});