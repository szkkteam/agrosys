webpackJsonp([1],{"./frontend/app/farmApp/operation/order/components/OrderListItem/messages.js":function(e,t){},"./frontend/app/farmApp/operation/order/components/OrderMaster/messages.js":function(e,t){},"./frontend/app/farmApp/operation/order/components/OrderMasterList/messages.js":function(e,t){},"./frontend/app/farmApp/operation/pages/OrderOverview/OrderOverview.js":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./node_modules/react/index.js"),r=a.n(n),l=a("./node_modules/react-helmet/lib/Helmet.js"),i=a.n(l),o=(a("./node_modules/prop-types/index.js"),a("./node_modules/react-intl/lib/index.js")),c=Object(o.c)({title:{id:"app.farmApp.OrderOverview.title",defaultMessage:"My tasks"}}),d=a("./node_modules/react-router-dom/esm/react-router-dom.js"),s=a("./node_modules/styled-components/dist/styled-components.browser.esm.js"),m=a("./frontend/app/farmApp/routes.js"),p=a("./frontend/app/components/index.js"),u=(a("./frontend/app/farmApp/operation/order/components/OrderMaster/messages.js"),a("./node_modules/@material-ui/core/esm/index.js")),f=(a("./frontend/app/farmApp/operation/order/components/OrderMasterList/messages.js"),a("./frontend/app/farmApp/operation/order/components/OrderListItem/messages.js"),a("./frontend/app/components/List/MasterListItem.js")),y=a("./frontend/app/farmApp/product/crop/components/index.js");a("./node_modules/@material-ui/icons/ArrowForwardIos.js");var g=Object(s.c)(f.a).withConfig({displayName:"OrderListItem__ListContainer",componentId:"ivwqi8-0"})(["align-items:flex-start;"]),v=Object(s.c)(u.ListItemAvatar).withConfig({displayName:"OrderListItem__AvatarContainer",componentId:"ivwqi8-1"})(["margin-top:6px;"]),E=s.c.span.withConfig({displayName:"OrderListItem__Flex",componentId:"ivwqi8-2"})(["display:flex;"]),h=s.c.span.withConfig({displayName:"OrderListItem__Spacer",componentId:"ivwqi8-3"})(["flex-grow:1;"]),b=function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);return r.a.createElement(g,{button:!0,divider:!0},r.a.createElement(v,null,r.a.createElement(u.Avatar,null,"JD")),r.a.createElement(u.ListItemText,{disableTypography:!0,primary:r.a.createElement(E,null,r.a.createElement(u.Typography,{variant:"body1"},"Havesting - Őszi búza 2020"),r.a.createElement(h,null),r.a.createElement(y.b,{title:"Őszi búza",short:"őb"})),secondary:r.a.createElement(E,null,r.a.createElement(u.Typography,{variant:"caption"},"Field 1, 12 ha"),r.a.createElement(h,null))}))};b.propTypes={};var j=b;function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var O=Object(s.c)(u.Paper).withConfig({displayName:"OrderMasterList__PinnedUl",componentId:"sc-1yds1pv-0"})(["background-color:inherit;padding:0;"]),x=s.c.li.withConfig({displayName:"OrderMasterList__PinnedLi",componentId:"sc-1yds1pv-1"})(["background-color:inherit;"]),I=function(e){var t=_({},e);return r.a.createElement(p.j,_({onSelect:function(e){},listProps:{subheader:r.a.createElement("li",null)}},t),["In progress","Paused","Not started"].map(function(e){return r.a.createElement(x,{key:"group-".concat(e)},r.a.createElement(O,{component:"ul"},r.a.createElement(u.ListSubheader,null,e),r.a.createElement(j,null),r.a.createElement(j,null)))}))};I.propTypes={};var C=I;var w=Object(s.c)(u.Paper).withConfig({displayName:"OrderMaster__Container",componentId:"sc-109vj83-0"})(["flex-grow:1;display:flex;flex-direction:column;"]),L=function(e){return function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e),r.a.createElement(w,null,r.a.createElement(p.q,{p:2,title:"My tasks"}),r.a.createElement(C,null))};L.propTypes={};var T=L,A=a("./frontend/app/messages.js"),M=Object(o.c)({actual:{id:"app.farmApp.operation.order.OrderDetail.tab.actual",defaultMessage:"Actuals"},note:{id:"app.farmApp.operation.order.OrderDetail.tab.note",defaultMessage:"Notes"},photo:{id:"app.farmApp.operation.order.OrderDetail.tab.photo",defaultMessage:"Photos"},map:{id:"app.farmApp.operation.order.OrderDetail.tab.map",defaultMessage:"Map"},activity:{id:"app.farmApp.operation.order.OrderDetail.tab.activity",defaultMessage:"Activity"}}),D=a("./node_modules/@material-ui/system/esm/index.js"),W=a("./node_modules/@material-ui/icons/Schedule.js"),N=a.n(W),k=(a("./node_modules/@material-ui/icons/CalendarToday.js"),a("./node_modules/@material-ui/icons/MoreVert.js")),B=a.n(k),P=(a("./node_modules/@material-ui/icons/RemoveCircle.js"),a("./node_modules/@material-ui/icons/AddCircle.js")),S=a.n(P),z=(a("./node_modules/@material-ui/icons/Warning.js"),a("./frontend/app/farmApp/components/index.js"));function F(e){if(null==e)throw new TypeError("Cannot destructure undefined")}var q=s.c.div.withConfig({displayName:"OrderDetail__Flex",componentId:"sc-15jvvg8-0"})(["display:flex;flex-direction:column;flex-grow:1;"]),H=s.c.div.withConfig({displayName:"OrderDetail__FlexRow",componentId:"sc-15jvvg8-1"})([""," display:flex;align-items:center;"],D.spacing),J=Object(s.c)(u.Typography).withConfig({displayName:"OrderDetail__InfoTitle",componentId:"sc-15jvvg8-2"})(["",""],D.spacing),R=s.c.div.withConfig({displayName:"OrderDetail__Spacer",componentId:"sc-15jvvg8-3"})(["flex-grow:1;"]),G=Object(s.c)(u.Button).withConfig({displayName:"OrderDetail__EditButton",componentId:"sc-15jvvg8-4"})(["",""],D.spacing),X=Object(s.c)(u.Button).withConfig({displayName:"OrderDetail__ActionButton",componentId:"sc-15jvvg8-5"})(["",""],D.spacing),U=s.c.div.withConfig({displayName:"OrderDetail__ActionButtonContainer",componentId:"sc-15jvvg8-6"})(["position:absolute;bottom:15px;left:50%;transform:translateX(-50%);"]),V=Object(s.c)(u.ListItem).withConfig({displayName:"OrderDetail__TaskDetailListItem",componentId:"sc-15jvvg8-7"})([""," display:flex;justify-content:space-between;"],D.spacing),K=Object(s.c)(u.Typography).withConfig({displayName:"OrderDetail__TypoBold",componentId:"sc-15jvvg8-8"})(["",""],D.typography),Q=(Object(s.c)(u.ListItem).withConfig({displayName:"OrderDetail__NestedListItem",componentId:"sc-15jvvg8-9"})(["",""],function(e){var t=e.theme;return"\n        padding-left: ".concat(t.spacing(2),"\n    ")}),function(e){return F(e),r.a.createElement(u.Grid,{container:!0,spacing:4},r.a.createElement(u.Grid,{item:!0,xs:8},r.a.createElement(z.h,{title:"Plan"},"No planned values"),r.a.createElement(z.h,{mt:2,title:"Actuals"},r.a.createElement(u.List,null,r.a.createElement(u.ListItem,{divider:!0},r.a.createElement(u.ListItemText,{disableTypography:!0,primary:r.a.createElement(u.Typography,{variant:"body1"},"Working hours"),secondary:r.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px",display:"flex",alignItems:"center"}},r.a.createElement("li",null,r.a.createElement(u.Typography,{variant:"body2"},"00:01:22")),r.a.createElement(R,null),r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"Add",icon:r.a.createElement(S.a,null),onClick:function(){return null}})))})),r.a.createElement(u.ListItem,{divider:!0},r.a.createElement(u.ListItemText,{disableTypography:!0,primary:r.a.createElement(u.Typography,{variant:"body1"},"Equipment"),secondary:r.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px",display:"flex",alignItems:"center"}},r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"John Deere 1770D",onDelete:function(){return null}})),r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"XFD-56 Cultivator",onDelete:function(){return null}})),r.a.createElement(R,null),r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"Add",icon:r.a.createElement(S.a,null),onClick:function(){return null}})))})),r.a.createElement(u.ListItem,{divider:!0},r.a.createElement(u.ListItemText,{disableTypography:!0,primary:r.a.createElement(u.Typography,{variant:"body1"},"Area covered"),secondary:r.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px",display:"flex",alignItems:"center"}},r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"5.8 ha"})),r.a.createElement(R,null),r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"Add",icon:r.a.createElement(S.a,null),onClick:function(){return null}})))})),r.a.createElement(u.ListItem,{divider:!0},r.a.createElement(u.ListItemText,{disableTypography:!0,primary:r.a.createElement(u.Typography,{variant:"body1"},"Inputs"),secondary:r.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px",display:"flex",alignItems:"center"}},r.a.createElement("li",null,r.a.createElement(u.Typography,{variant:"body2"},"No inputs")),r.a.createElement(R,null),r.a.createElement("li",null,r.a.createElement(u.Chip,{label:"Add",icon:r.a.createElement(S.a,null),onClick:function(){return null}})))}))))),r.a.createElement(u.Grid,{item:!0,xs:4},r.a.createElement(z.h,{expandable:!1,divider:!1,title:"Task summary"},r.a.createElement(u.List,{component:"ul"},r.a.createElement(V,{component:"li",divider:!0,py:2,px:0},r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Task type"),r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Cultivation")),r.a.createElement(V,{component:"li",divider:!0,py:2,px:0},r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Implement"),r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Cultivator")),r.a.createElement(V,{component:"li",divider:!0,py:2,px:0},r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Operator"),r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"John Doe")),r.a.createElement(V,{component:"li",divider:!0,py:2,px:0},r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Hours"),r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"00:01:22")),r.a.createElement(V,{component:"li",divider:!0,py:2,px:0},r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"Area"),r.a.createElement(K,{variant:"body2",fontWeight:"fontWeightBold"},"5.8 / 12 ha"))))))}),Y=function(e){return F(e),r.a.createElement(q,null,r.a.createElement(H,{ml:-2},r.a.createElement(H,{m:2,mt:1},r.a.createElement(N.a,null),r.a.createElement(J,{pl:1,variant:"body2"},"In progress"))),r.a.createElement(p.C,{divider:!0,tabs:[{title:M.actual},{title:M.map},{title:M.note},{title:M.photo},{title:M.activity}]},r.a.createElement(Q,null),r.a.createElement("div",null,"ch 4"),r.a.createElement("div",null,"ch 4"),r.a.createElement("div",null,"ch 4"),r.a.createElement("div",null,"ch 4")),r.a.createElement(R,null),r.a.createElement(U,null,r.a.createElement(X,{py:1.5,px:3,variant:"contained",color:"primary"},"Start working on Harvesting")))},Z=function(e){return F(e),r.a.createElement(z.k,{containerProps:{component:u.Container,maxWidth:"lg",pb:2},title:"Harvesting - Őszi búza 2020",subheader:"Field 1, 12 ha",action:r.a.createElement(r.a.Fragment,null,r.a.createElement(G,{mx:2,color:"primary"},r.a.createElement(o.a,A.a.edit)),r.a.createElement(p.h,{icon:B.a,items:[{title:A.a.delete,onClick:function(){return null}}]}))},r.a.createElement(Y,null))};Z.propTypes={};var $=Z;function ee(){return(ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}t.default=function(e){ee({},e);var t=Object(o.e)();if(Object(d.h)().id)return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,null,r.a.createElement("title",null,t.formatMessage(c.title))),r.a.createElement(p.i,{spacing:0},r.a.createElement(T,null),r.a.createElement($,null)));var a=m.b[m.a.OperationOrderOverview].toPath({id:1});return r.a.createElement(d.c,{to:a})}},"./node_modules/@material-ui/icons/Schedule.js":function(e,t,a){"use strict";var n=a("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("./node_modules/react/index.js")),l=(0,n(a("./node_modules/@material-ui/icons/utils/createSvgIcon.js")).default)(r.default.createElement(r.default.Fragment,null,r.default.createElement("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),r.default.createElement("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"})),"Schedule");t.default=l},"./node_modules/@material-ui/icons/Warning.js":function(e,t,a){"use strict";var n=a("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("./node_modules/react/index.js")),l=(0,n(a("./node_modules/@material-ui/icons/utils/createSvgIcon.js")).default)(r.default.createElement("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");t.default=l}});