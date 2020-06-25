import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

export default class DashboardMenu extends React.Component {


    render() {
        const item = {
            //route: ROUTES.Farm,
            Icon: HomeIcon,
            label: 'Dashboard',
          }

        return (
            <SideBarItem
                item={item}
                { ...this.props }
            />
        )
    }
}