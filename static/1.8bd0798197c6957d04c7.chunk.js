webpackJsonp([1],{"./frontend/app/security/pages/Profile/Profile.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/react/index.js"),a=n.n(r),s=n("./node_modules/react-redux/es/index.js"),o=n("./node_modules/react-helmet/lib/Helmet.js"),c=n.n(o),u=(n("./frontend/app/actions.js"),n("./frontend/app/components/Content/index.js")),i=n("./node_modules/redux/es/index.js"),l=n("./node_modules/redux-form/es/reduxForm.js"),d=n("./frontend/app/security/actions.js"),m=n("./frontend/app/components/Alert/index.js"),p=n("./frontend/app/components/Form/index.js"),f=n("./frontend/app/utils/async/index.js"),b=Object(l.a)({form:"updateProfile"}),j=Object(s.connect)(function(e){return{initialValues:e.security.user}}),E=Object(f.b)(n("./frontend/app/security/sagas/updateProfile.js")),h=Object(i.d)(j,b,E)(function(e){var t=e.error,n=e.handleSubmit,r=e.pristine,s=e.submitting;return a.a.createElement("div",null,a.a.createElement("h2",null,"Update Profile!"),t&&a.a.createElement(m.a,null,t),a.a.createElement("form",{onSubmit:n(d.h)},a.a.createElement(p.j,{name:"firstName",autoFocus:!0}),a.a.createElement(p.j,{name:"lastName"}),a.a.createElement(p.j,{name:"username"}),a.a.createElement(p.c,{name:"email"}),a.a.createElement("div",{className:"row"},a.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:r||s},s?"Saving...":"Save"))))});var g=n("./node_modules/redux-form/es/actions.js").a.reset,v=function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).state={formVisible:!1},n}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var s=r.prototype;return s.componentWillReceiveProps=function(e){e.submitSucceeded&&this.resetForm()},s.resetForm=function(){this.setState({formVisible:!1}),this.props.reset("changePassword")},s.renderShowFormButton=function(){var e=this;return a.a.createElement("button",{type:"button",className:"btn",onClick:function(){return e.setState({formVisible:!0})}},"Click to change your password")},s.renderForm=function(){var e=this,t=this.props,n=t.error,r=t.handleSubmit,s=t.pristine,o=t.submitting;return a.a.createElement("div",null,n&&a.a.createElement(m.a,null,n),a.a.createElement("form",{onSubmit:r(d.a)},a.a.createElement(p.e,{name:"password",label:"Current Password",autoFocus:!0}),a.a.createElement(p.e,{name:"newPassword",label:"New Password"}),a.a.createElement(p.e,{name:"confirmNewPassword",label:"Confirm New Password"}),a.a.createElement("div",{className:"row"},a.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:s||o},o?"Saving...":"Save")," ",a.a.createElement("button",{type:"button",className:"btn",onClick:function(){return e.resetForm()}},"Cancel"))))},s.render=function(){return a.a.createElement("div",null,a.a.createElement("h2",null,"Change Password!"),this.state.formVisible?this.renderForm():this.renderShowFormButton())},r}(a.a.Component),w=Object(l.a)({form:"changePassword"}),y=Object(s.connect)(function(e){return{}},function(e){return Object(i.b)({reset:g},e)}),P=Object(f.b)(n("./frontend/app/security/sagas/changePassword.js")),x=Object(i.d)(y,w,P)(v);t.default=function(){return a.a.createElement(u.a,null,a.a.createElement(c.a,null,a.a.createElement("title",null,"User Profile")),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"six cols"},a.a.createElement(h,null)),a.a.createElement("div",{className:"six cols"},a.a.createElement(x,null))))}},"./frontend/app/security/sagas/changePassword.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"KEY",function(){return c}),n.d(t,"changePasswordSaga",function(){return u});var r=n("./node_modules/redux-saga/es/effects.js"),a=n("./frontend/app/sagas.js"),s=n("./frontend/app/security/actions.js"),o=n("./frontend/app/security/api.js"),c="changePassword",u=Object(a.a)(s.a,regeneratorRuntime.mark(function e(t){var n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.a)(o.a.changePassword,t);case 2:return n=e.sent,a=n.token,e.next=6,Object(r.b)(s.a.success({token:a}));case 6:case"end":return e.stop()}},e)}));t.default=function(){return[Object(r.g)(s.a.TRIGGER,u)]}},"./frontend/app/security/sagas/updateProfile.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"KEY",function(){return u}),n.d(t,"updateProfileSaga",function(){return i});var r=n("./node_modules/redux-saga/es/effects.js"),a=n("./frontend/app/sagas.js"),s=n("./frontend/app/security/actions.js"),o=n("./frontend/app/security/api.js"),c=n("./frontend/app/security/reducer.js"),u="updateProfile",i=Object(a.a)(s.h,regeneratorRuntime.mark(function e(t){var n,a,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.d)(c.b);case 2:return n=e.sent,a=n.user,e.next=6,Object(r.a)(o.a.updateProfile,a,t);case 6:return u=e.sent,e.next=9,Object(r.b)(s.h.success({user:u}));case 9:case"end":return e.stop()}},e)}));t.default=function(){return[Object(r.g)(s.h.TRIGGER,i)]}}});