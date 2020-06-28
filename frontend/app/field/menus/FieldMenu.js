import React from 'react'
import { ROUTES } from 'routes'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

export default class FieldMenu extends React.Component {

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

        return (
            <SideBarItem
                item={item}
                {...this.proprs}
            />
        )
    }
}
