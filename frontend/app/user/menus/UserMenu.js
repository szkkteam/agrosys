import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from "@material-ui/icons/Home";
import { ROUTES } from 'routes'
import { SideBarItem } from 'components'


const defaultFarmMenu = [{ 
  label: "Test User",
  Icon: HomeIcon,
  //route: ROUTES.Farms,
 }];

 /*
             <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  <SideBarItem
        item={item}
        { ...this.props }
      />
 */

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userMenu: defaultFarmMenu
    }
  }

  render() {
    const { userMenu } = this.state;
    const item = {
      //route: ROUTES.Farm,
      Icon: {
        src: Avatar,
        props: { alt: "Remy", src: "/static/images/avatar/1.jpg" }
      },
      label: 'John Doe',
      items: [{
          label : "Change user"
        }],

    }
    return (
        <SideBarItem
            item={item}
            { ...this.props }
        />

    )
  }


 }