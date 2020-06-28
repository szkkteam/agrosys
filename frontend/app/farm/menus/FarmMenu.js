import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import { ROUTES } from 'routes'
import { SideBarItem } from 'components'

var onClick = () => {
    
}
/*
export const FarmMenu = {
      name: "farm", 
      Icon: HomeIcon, 
      route: ROUTES.Farms,
      items: [
        { name: "statements", label: "Statements", onClick },
        { name: "reports", label: "Reports", onClick }
      ]    
}
*/

const defaultFarmMenu = [{ 
  label: "Create New",
  Icon: {
    src: HomeIcon,
    props: { className: "drawer-item-icon", fontSize: "default" }
  },
  route: ROUTES.Farms,
 }];

export default class FarmMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      farmMenu: defaultFarmMenu
    }
  }

  render() {
    const { farmMenu } = this.state;
    const item = {
      route: ROUTES.Farm,
      Icon: {
        src: HomeIcon,
        props: { className: "drawer-item-icon", fontSize: "default" }
      },
      label: 'Farm',
      items: farmMenu,
    }
    return (
      <SideBarItem
        item={item}
        { ...this.props }
      />
    )
  }


 }