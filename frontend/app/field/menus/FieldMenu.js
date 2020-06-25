import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import { SideBarItem } from 'components'

export default class FieldMenu extends React.Component {

    render() {
        const item = {
            //route: ROUTES.Farm,
            Icon: HomeIcon,
            label: 'Fields',
        }

        return (
            <SideBarItem
                item={item}
                {...this.proprs}
            />
        )
    }
}
