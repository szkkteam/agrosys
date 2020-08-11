import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { ROUTES } from 'routes'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

class FieldMenu extends React.Component {

    constructor(props) {
        super(props)
      }

    render() {
        const item = {
            //route: ROUTES.Farm,
            Icon: {
                src: HomeIcon,
                props: { className: "drawer-item-icon", fontSize: "default" }
              },
            //label: 'Fields',
            route: ROUTES.FieldList,
        }
        const { isAuthenticated } = this.props

        return (
            <div>
                { isAuthenticated &&
                <SideBarItem
                    item={item}
                    {...this.proprs}
                />
                }
            </div>
        )
    }
}


const withConnect = connect(
    (state) => ({ isAuthenticated: state.security.isAuthenticated }),
  )
  
  
export default compose(
    //withRouter,
    withConnect,
)(FieldMenu)