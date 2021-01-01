import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavRailItem } from 'components/NavRail'
 
const DashboardMenuItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.DashboardHome}
            IconComponent={DashboardIcon}
            {...rest}
        />       
    )
}

DashboardMenuItem.propTypes = {

}

export default DashboardMenuItem