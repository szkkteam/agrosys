import React from 'react'
import { ROUTES } from 'routes'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

const item = {
    //route: ROUTES.Farm,
    Icon: {
        src: HomeIcon,
        props: { className: "drawer-item-icon", fontSize: "default" }
      },
    label: 'Productions',
    route: ROUTES.ProductionList,
}

export default ({}) => (
    <SideBarItem
        item={item}
        {...this.proprs}
    />
)