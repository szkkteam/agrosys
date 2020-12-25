webpackJsonp([2],{"./frontend/app/resource/inventory/components/InventoryFillProgress/messages.js":function(e,n){},"./frontend/app/resource/inventory/components/InventoryList/messages.js":function(e,n){},"./frontend/app/resource/inventory/pages/InventoryList/InventoryList.js":function(e,n,t){"use strict";function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function a(){var e=c(["\n    flex-grow: 1;\n"]);return a=function(){return e},e}function i(){var e=c(["\n    display: flex;\n"]);return i=function(){return e},e}function o(){var e=c(["\n    border-bottom: 2px solid black;\n    padding: ","px 0;\n"]);return o=function(){return e},e}function l(){var e=c(["\n    height: 100%;\n"]);return l=function(){return e},e}function u(){var e=c(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"]);return u=function(){return e},e}function c(e,n){return n||(n=e.slice(0)),e.raw=n,e}function s(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function d(){var e=p(["\n    margin-top: 15px;\n"]);return d=function(){return e},e}function p(e,n){return n||(n=e.slice(0)),e.raw=n,e}function m(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function f(){var e=y(["\n    padding-top: 20px;\n"]);return f=function(){return e},e}function v(){var e=y(["\n    padding-bottom: 20px;\n    border-bottom: 2px solid black;\n"]);return v=function(){return e},e}function b(){var e=y(["\n    height: 100%;\n    padding: 20px 5px;\n"]);return b=function(){return e},e}function y(e,n){return n||(n=e.slice(0)),e.raw=n,e}function g(){var e=L(["\n    position: absolute;\n    right: 5px;\n    width: 34px;\n    height: 34px;\n    border-radius: 50%;\n    //padding: 10px 0;\n    top: 3px;\n    display: none;\n    ",":hover & {\n        display: block;\n    }\n"]);return g=function(){return e},e}function x(){var e=L(["\n    width: 100%;\n"]);return x=function(){return e},e}function E(){var e=L(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    //margin-left: -10px;\n"]);return E=function(){return e},e}function h(){var e=L(["\n    position: relative;\n    font-size: 1em;\n    font-weight: 700;\n    margin: 0 25px 7px 0;\n"]);return h=function(){return e},e}function j(){var e=L(["\n    flex: 1 1 auto;\n    min-width: 0;\n    font-size: 14px;\n    ","\n"]);return j=function(){return e},e}function w(){var e=L(["\n    min-width: 30px;\n    padding-right: 10px;\n    > svg {\n        font-size: 2.0rem;\n    }\n"]);return w=function(){return e},e}function I(){var e=L(["\n    height: 70px;\n    width: 100%;\n    //border-top: 1px solid rgba(214, 220, 225, 0.8);\n    //border-top: 1px solid black;\n    padding: 0;\n    cursor: pointer;\n    > div {\n        padding: 10px 5px;\n        display: flex;\n        width: 100%;\n        align-items: center;\n        min-height: 69px;        \n    }\n"]);return I=function(){return e},e}function O(){var e=L(["\n    padding-left: 20px;\n"]);return O=function(){return e},e}function L(e,n){return n||(n=e.slice(0)),e.raw=n,e}function T(){var e=M(["\n    height: 100%;\n    width: 100%;\n"]);return T=function(){return e},e}function M(e,n){return n||(n=e.slice(0)),e.raw=n,e}Object.defineProperty(n,"__esModule",{value:!0});var _=t("./node_modules/react/index.js"),A=t.n(_),k=t("./node_modules/react-helmet/lib/Helmet.js"),C=t.n(k),B=t("./node_modules/react-intl/lib/index.js"),N=Object(B.c)({title:{id:"app.farmApp.inventory.InventoryList.title",defaultMessage:"Inventory"}}),F=t("./node_modules/styled-components/dist/styled-components.browser.esm.js"),G=t("./frontend/app/components/index.js"),W=t("./node_modules/prop-types/index.js"),P=t.n(W),R=Object(B.c)({title:{id:"app.farmApp.inventory.InventoryLayout.title",defaultMessage:"Inventory items"},searchButton:{id:"app.farmApp.inventory.InventoryLayout.SearchButton.title",defaultMessage:"Search..."},addNewTitle:{id:"app.farmApp.inventory.InventoryLayout.AddButton.title",defaultMessage:"Add new"}}),z=t("./frontend/app/utils/hooks/index.js"),S=t("./frontend/app/components/Table/index.js"),q=t("./node_modules/@material-ui/core/esm/index.js"),D=[{title:"Name",field:"title"},{title:"Active",field:"isActive",type:"boolean"}],H=F.b.div(u()),J=F.b.div(l()),K=Object(F.b)(q.Typography)(o(),20),Q=Object(F.b)(q.Grid)(i()),U=F.b.div(a()),V=function(e){r(e);var n=Object(_.useRef)(null),t=Object(_.useRef)(null),a=Object(z.a)(t,n,500);return A.a.createElement(J,{ref:t},A.a.createElement(K,{ref:n,variant:"h5"},"Items - Bin 1"),A.a.createElement(S.b,{height:a-45}))},X=function(e){return r(e),A.a.createElement(H,null,A.a.createElement(S.a,{columns:D},A.a.createElement(S.e,{title:R.title},A.a.createElement(q.Grid,{container:!0,justify:"flex-end"},A.a.createElement(Q,{item:!0,xs:9},A.a.createElement(U,null),A.a.createElement(G.l,{title:R.addNewTitle})),A.a.createElement(q.Grid,{item:!0,xs:3}))),A.a.createElement(G.e,null,A.a.createElement(ce,null),A.a.createElement(V,null))))};X.propTypes={};var Y=X,Z=(t("./frontend/app/resource/inventory/components/InventoryFillProgress/messages.js"),t("./node_modules/@material-ui/core/esm/Typography/index.js")),$=t("./node_modules/@material-ui/core/esm/LinearProgress/index.js"),ee=function(e){var n=e.current,t=e.max,r=e.unit,a=void 0===r?"":r,i=e.className,o=Object(B.e)(),l=n/t*100,u=function(e){return o.formatNumber(e,{unit:a,unitDisplay:"narrow",style:"unit"})};return A.a.createElement("div",{className:i},A.a.createElement($.default,{variant:"determinate",value:l}),A.a.createElement(Z.default,{variant:"caption"},function(){if(""!=a){return u(n)+" / "+u(t)+" ("+l.toFixed(1)+"%)"}return l.toFixed(1)+"%"}()))};ee.propTypes={current:P.a.number.isRequired,max:P.a.number.isRequired,unit:P.a.string};var ne=ee,te=Object(B.c)({title:{id:"app.farmApp.inventory.InventoryHeader.title",defaultMessage:"Inventory"}}),re=Object(F.b)(q.Typography)(d()),ae=function(e){return s(e),A.a.createElement(q.Grid,{container:!0,alignItems:"stretch",spacing:1},A.a.createElement(q.Grid,{item:!0,xs:12},A.a.createElement(re,{variant:"h5"},A.a.createElement(B.a,te.title))))};ae.propTypes={};var ie=(t("./frontend/app/resource/inventory/components/InventoryList/messages.js"),F.b.div(b())),oe=Object(F.b)(q.Typography)(v()),le=Object(F.b)(q.List)(f()),ue=function(e){return m(e),A.a.createElement(ie,null,A.a.createElement(oe,{variant:"h5"},"Warehouse / Bins"),A.a.createElement(le,{component:"ul"},A.a.createElement(Ie,{title:"Warehouse 1"},A.a.createElement(Ie,{title:"Bin 1"}),A.a.createElement(Ie,{title:"Bin 2"})),A.a.createElement(Ie,{title:"Warehouse 2"}),A.a.createElement(Ie,{title:"Warehouse 3"})))};ue.propTypes={};var ce=ue,se=Object(B.c)({edit:{id:"app.farmApp.inventory.IventoryListItem.Menu.edit",defaultMessage:"Edit"},delete:{id:"app.farmApp.inventory.IventoryListItem.Menu.delete",defaultMessage:"Delete"}}),de=t("./node_modules/@material-ui/icons/ExpandLess.js"),pe=t.n(de),me=t("./node_modules/@material-ui/icons/ExpandMore.js"),fe=t.n(me),ve=F.b.div(O()),be=Object(F.b)(q.ListItem)(I()),ye=Object(F.b)(q.ListItemIcon)(w()),ge=F.b.div(j(),function(e){return e.paddingLeft&&"\n        padding-left: 42px;\n    "}),xe=Object(F.b)(q.Typography)(h()),Ee=F.b.div(E()),he=Object(F.b)(ne)(x()),je=Object(F.b)(function(e){return A.a.createElement(G.d,e)})(g(),be),we=function(e){var n=e.title,t=e.children,r=Object(_.useState)(!1),a=r[0],i=r[1],o=function(){i(!a)},l=[{title:se.edit,onClink:null},{title:se.delete,onClink:null}],u=A.a.Children.count(t);return A.a.createElement(A.a.Fragment,null,A.a.createElement(be,null,A.a.createElement("div",null,u?A.a.createElement(ye,{onClick:o},a?A.a.createElement(pe.a,null):A.a.createElement(fe.a,null)):null,A.a.createElement(ge,{paddingLeft:!u},A.a.createElement(xe,{variant:"h2",noWrap:!0},n),A.a.createElement(Ee,null,A.a.createElement(he,{current:50,max:100,unit:"liter"})),A.a.createElement(je,{items:l})))),u?A.a.createElement(q.Collapse,{in:a,timeout:"auto",unmountOnExit:!0},A.a.createElement(ve,null,t)):null)};we.propTypes={};var Ie=we,Oe=F.b.div(T());n.default=function(e){var n=(e.match,e.location,Object(B.e)());return A.a.createElement(Oe,null,A.a.createElement(C.a,null,A.a.createElement("title",null,n.formatMessage(N.title))),A.a.createElement(G.a,null,A.a.createElement(Y,null)))}}});