import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { ROUTES } from 'routes'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

const item = {
    //route: ROUTES.Farm,
    Icon: {
        src: HomeIcon,
        props: { className: "drawer-item-icon", fontSize: "default" }
      },
    label: 'Templates',
    route: ROUTES.TemplatePage,
}

const TemplateMenu = ({isAuthenticated}) => (
    <div>
        { isAuthenticated &&
            <SideBarItem
            item={item}
            {...this.proprs}
        />
        }
    </div>
)


const withConnect = connect(
    (state) => ({ isAuthenticated: state.security.isAuthenticated }),
  )
  
  
export default compose(
    //withRouter,
    withConnect,
)(TemplateMenu)