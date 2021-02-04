webpackJsonp([0],{"./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionLayout/messages.js":function(e,t){},"./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionMasterDetail/messages.js":function(e,t){},"./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionSummaryStats/messages.js":function(e,t){},"./frontend/app/farmApp/cropProduction/fieldProduction/pages/FieldProductionOverview/FieldProductionOverview.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/react/index.js"),a=n.n(r),o=n("./node_modules/react-helmet/lib/Helmet.js"),l=n.n(o),i=n("./node_modules/react-intl/lib/index.js"),c=Object(i.c)({title:{id:"app.farmApp.cropProduction.fieldProduction.FieldProductionList.title",defaultMessage:"Parcels"}}),d=n("./node_modules/styled-components/dist/styled-components.browser.esm.js"),u=(n("./node_modules/react-router-dom/esm/react-router-dom.js"),n("./frontend/app/farmApp/cropProduction/season/components/index.js")),m=(n("./node_modules/prop-types/index.js"),n("./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionSummaryStats/messages.js"),n("./node_modules/@material-ui/icons/ArrowDropDown.js")),s=n.n(m),p=n("./node_modules/@material-ui/core/esm/index.js"),f=n("./frontend/app/components/index.js");function y(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}Object(d.b)(Object(r.forwardRef)(function(e,t){return a.a.createElement(p.Toolbar,E({ref:t},e))})).withConfig({displayName:"FieldProductionSummaryStats__StyledToolbar",componentId:"c83hkx-0"})(["background-color:#fff;"]);var b=d.b.div.withConfig({displayName:"FieldProductionSummaryStats__Column",componentId:"c83hkx-1"})(["display:flex;flex-direction:column;text-align:left;> p:nth-child(1){font-size:1rem;font-weight:bold;}"]),g=Object(d.b)(p.Button).withConfig({displayName:"FieldProductionSummaryStats__AddButton",componentId:"c83hkx-2"})(["padding:4px 4px;min-width:20px;"]),h=Object(d.b)(p.ButtonGroup).withConfig({displayName:"FieldProductionSummaryStats__StyledButtonGroup",componentId:"c83hkx-3"})(["width:100%;"]),v=Object(d.b)(p.Grid).withConfig({displayName:"FieldProductionSummaryStats__GridContainer",componentId:"c83hkx-4"})(["border:1px solid rgba(35,149,83,0.5);padding:5px 20px;"]),j=function(e){var t=e.children,n=y(e,["children"]);return a.a.createElement(h,E({variant:"outlined",color:"primary","aria-label":"split button"},n),t,a.a.createElement(g,{color:"primary",size:"small","aria-label":"select merge strategy","aria-haspopup":"menu"},a.a.createElement(s.a,null)))},x=function(e){return function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e),a.a.createElement(j,null,a.a.createElement(v,{container:!0,justify:"flex-start",alignItems:"center"},a.a.createElement(p.Grid,{item:!0,xs:3},a.a.createElement(b,null,a.a.createElement(p.Typography,{variant:"body2"},"35.5"),a.a.createElement(p.Typography,{variant:"body2"},"hectare"))),a.a.createElement(p.Grid,{item:!0,xs:3},a.a.createElement(b,null,a.a.createElement(p.Typography,{variant:"body2"},"BBCH11"),a.a.createElement(p.Typography,{variant:"body2"},"Growth stage"))),a.a.createElement(p.Grid,{item:!0,xs:3},a.a.createElement(b,null,a.a.createElement(p.Typography,{variant:"body2"},"3 days till"),a.a.createElement(p.Typography,{variant:"body2"},"Harvesting"))),a.a.createElement(p.Grid,{item:!0,xs:3},a.a.createElement(b,null,a.a.createElement(p.Typography,{variant:"body2"},"Abony, "),a.a.createElement(p.Typography,{variant:"body2"},"Variants")))))};x.propTypes={};var w=x,P=(n("./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionLayout/messages.js"),n("./frontend/app/farmApp/resource/field/components/index.js")),S=n("./frontend/app/farmApp/resource/field/constants.js"),_=(n("./frontend/app/farmApp/cropProduction/fieldProduction/components/FieldProductionMasterDetail/messages.js"),n("./frontend/app/farmApp/map/components/index.js")),O=(Object(i.c)({edit:{id:"app.farmApp.cropProduction.fieldProduction.FieldProductionSideDetail.Menu.edit",defaultMessage:"Edit"},delete:{id:"app.farmApp.cropProduction.fieldProduction.FieldProductionSideDetail.Menu.delete",defaultMessage:"Delete"}}),n("./frontend/app/messages.js"),n("./frontend/app/utils/route/index.js"),n("./frontend/app/utils/hoc/index.js"),n("./node_modules/@material-ui/icons/Close.js")),T=n.n(O),C=n("./frontend/app/farmApp/cropProduction/task/components/index.js"),F=n("./node_modules/@material-ui/icons/NoteAdd.js"),A=n.n(F),I=n("./node_modules/@material-ui/icons/InsertDriveFile.js"),G=n.n(I);function B(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var M=Object(d.b)(p.Grid).withConfig({displayName:"FieldProductionSideDetail__Container",componentId:"sc-16i85e8-0"})(["position:relative;"]),H=Object(d.b)(p.Toolbar).withConfig({displayName:"FieldProductionSideDetail__StyledToolbar",componentId:"sc-16i85e8-1"})(["padding:0 12px;"]),L=Object(d.b)(p.Grid).withConfig({displayName:"FieldProductionSideDetail__Content",componentId:"sc-16i85e8-2"})(["overflow-y:scroll;height:630px;padding:0 12px;padding-bottom:24px;"]),z=d.b.div.withConfig({displayName:"FieldProductionSideDetail__Flex",componentId:"sc-16i85e8-3"})(["display:flex;align-items:center;"]),V=d.b.div.withConfig({displayName:"FieldProductionSideDetail__SectionContainer",componentId:"sc-16i85e8-4"})(["margin:10px 0;width:100%;"]),R=Object(d.b)(p.Button).withConfig({displayName:"FieldProductionSideDetail__FloatButton",componentId:"sc-16i85e8-5"})(["position:absolute;width:","px;bottom:10px;left:50%;margin-left:-","px;"],300,150),q=d.b.div.withConfig({displayName:"FieldProductionSideDetail__Spacer",componentId:"sc-16i85e8-6"})(["flex-grow:1;"]),U=function(e){var t=e.onClose;return a.a.createElement(p.AppBar,{position:"initial"},a.a.createElement(H,null,a.a.createElement(p.Grid,{container:!0,spacing:0,direction:"row",justify:"flex-start",alignItems:"flex-start"},a.a.createElement(p.Grid,{item:!0,xs:12},a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"h6"},"Parcel 1"),a.a.createElement(q,null),a.a.createElement(p.IconButton,{"aria-label":"close",onClick:t},a.a.createElement(T.a,null)))),a.a.createElement(p.Grid,{item:!0,xs:4},a.a.createElement(p.Button,null,"Edit")),a.a.createElement(p.Grid,{item:!0,xs:4},a.a.createElement(p.Button,null,"Delete")),a.a.createElement(p.Grid,{item:!0,xs:4},a.a.createElement(p.Button,null,"Whatever")))))},W=d.b.div.withConfig({displayName:"FieldProductionSideDetail__SuggestionsBox",componentId:"sc-16i85e8-7"})(["padding:5px 0;background-color:lightgrey;width:100%;height:50px;text-align:center;"]),$=function(e){return k(e),a.a.createElement(V,null,a.a.createElement(p.Typography,{variant:"body1"},"Suggestions"),a.a.createElement(W,null,"No suggestions"))},J=function(e){k(e);var t=D(Object(r.useState)("pests"),2),n=t[0],o=t[1];return a.a.createElement(V,null,a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"body1"},"The field status"),a.a.createElement(q,null),a.a.createElement(p.Button,{color:"primary"},"Full screen")),a.a.createElement(p.Tabs,{value:n,onChange:function(e,t){o(t)}},a.a.createElement(p.Tab,{value:"pests",label:"Pests"}),a.a.createElement(p.Tab,{value:"nutriens",label:"Nutrient"})),"pests"===n?a.a.createElement("div",{style:{width:"100%",height:"100px"}},"Pests"):a.a.createElement("div",{style:{width:"100%",height:"100px"}},"Nutrients"))},K=function(e){return k(e),a.a.createElement(V,null,a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"body1"},"Growth stage"),a.a.createElement(q,null),a.a.createElement(p.Button,{color:"primary"},"Edit growth stage")),a.a.createElement(p.Grid,{container:!0},a.a.createElement(p.Grid,{item:!0,xs:6},a.a.createElement(p.Typography,{variant:"subtitle1"},"Current"),a.a.createElement(p.Typography,{variant:"body1"},"BBCH 13"),a.a.createElement(p.Typography,{variant:"body2"},"3 leaf stage")),a.a.createElement(p.Grid,{item:!0,xs:6},a.a.createElement(p.Typography,{variant:"subtitle1"},"december 19"),a.a.createElement(p.Typography,{variant:"body1"},"BBCH 21"),a.a.createElement(p.Typography,{variant:"body2"},"Lorem ipsum dolor sit amet, consectetur"))))},Q=function(e){return k(e),a.a.createElement(V,null,a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"body1"},"Weather"),a.a.createElement(q,null),a.a.createElement(p.Button,{color:"primary"},"full screen")),a.a.createElement(p.Grid,{container:!0},["Today","Saturday","Sunday","Monday"].map(function(e){return a.a.createElement(p.Grid,{item:!0,xs:3,key:e},a.a.createElement(p.Typography,{variant:"body1"},e),a.a.createElement(p.Typography,{variant:"caption"},"6°/1°"),a.a.createElement(p.Typography,{variant:"body2"},"1 mm"),a.a.createElement(p.Typography,{variant:"body2"},"3 m/s"))})))},X=(Object(d.b)(p.Button).withConfig({displayName:"FieldProductionSideDetail__FullButton",componentId:"sc-16i85e8-8"})(["width:100%;"]),function(e){return k(e),a.a.createElement(V,null,a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"body1"},"Tasks"),a.a.createElement(q,null),a.a.createElement(p.Button,{color:"primary"},"show tasks (12)")),a.a.createElement(p.Grid,{direction:"column",container:!0},[1,2,3].map(function(e){return a.a.createElement(p.Grid,{item:!0,xs:12,key:e},a.a.createElement(C.e,null))})))}),Y=Object(d.b)(p.CardContent).withConfig({displayName:"FieldProductionSideDetail__StyledCardContent",componentId:"sc-16i85e8-9"})(["display:flex;flex-direction:column;align-items:center;"]),Z=Object(d.b)(p.Grid).withConfig({displayName:"FieldProductionSideDetail__StyledGrid",componentId:"sc-16i85e8-10"})(["padding:0 8px;"]),ee=function(e){return k(e),a.a.createElement(V,null,a.a.createElement(z,null,a.a.createElement(p.Typography,{variant:"body1"},"Notes")),a.a.createElement(p.Grid,{direction:"row",container:!0},[1,2,3].map(function(e){return a.a.createElement(Z,{item:!0,xs:3,key:e},a.a.createElement(p.Card,null,a.a.createElement(Y,null,a.a.createElement(p.IconButton,null,a.a.createElement(G.a,null)),a.a.createElement(p.Typography,{variant:"caption"},"Oberserved..."))))}),a.a.createElement(Z,{item:!0,xs:3},a.a.createElement(p.Card,null,a.a.createElement(Y,null,a.a.createElement(p.IconButton,null,a.a.createElement(A.a,null)),a.a.createElement(p.Typography,{variant:"caption"},"Add note"))))))},te=function(e){return k(e),a.a.createElement(a.a.Fragment,null,a.a.createElement($,null),a.a.createElement(J,null),a.a.createElement(K,null),a.a.createElement(Q,null),a.a.createElement(X,null),a.a.createElement(ee,null))},ne=function(e){var t=e.onClose;B(e,["onClose"]);return a.a.createElement(M,{container:!0,spacing:0,direction:"row",justify:"flex-start",alignItems:"flex-start"},a.a.createElement(p.Grid,{item:!0,xs:12},a.a.createElement(U,{onClose:t})),a.a.createElement(L,{item:!0,xs:12},a.a.createElement(te,null)),a.a.createElement(R,{variant:"contained",color:"primary"},"Add new task"))};ne.propTypes={};var re=ne;function ae(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return oe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return oe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var le=function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var t=ae(Object(r.useState)(null),2),n=t[0],o=t[1];return a.a.createElement(f.f,null,a.a.createElement(P.i,{onSelect:function(e){o(n?null:{id:1})}}),a.a.createElement(f.v,{open:!!n},a.a.createElement(_.b,{controls:a.a.createElement(a.a.Fragment,null,a.a.createElement(_.d,null))}),a.a.createElement(re,{onClose:function(){o(null)}})))};le.propTypes={};var ie=le;function ce(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var de=function(e){var t;!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var n=(ce(t={},S.c,ie),ce(t,S.b,ie),ce(t,S.d,ie),t);return a.a.createElement(P.g,{viewComponents:n},a.a.createElement(w,null))};de.propTypes={};var ue=de;function me(){return(me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.default=function(e){me({},e);var t=Object(i.e)();return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.a,null,a.a.createElement("title",null,t.formatMessage(c.title))),a.a.createElement(u.a,{title:c.title}),a.a.createElement(ue,null))}},"./node_modules/@material-ui/icons/InsertDriveFile.js":function(e,t,n){"use strict";var r=n("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("./node_modules/react/index.js")),o=(0,r(n("./node_modules/@material-ui/icons/utils/createSvgIcon.js")).default)(a.default.createElement("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"}),"InsertDriveFile");t.default=o},"./node_modules/@material-ui/icons/NoteAdd.js":function(e,t,n){"use strict";var r=n("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("./node_modules/react/index.js")),o=(0,r(n("./node_modules/@material-ui/icons/utils/createSvgIcon.js")).default)(a.default.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"}),"NoteAdd");t.default=o}});