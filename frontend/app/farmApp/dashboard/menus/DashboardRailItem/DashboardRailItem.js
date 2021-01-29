import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavRailItem } from 'components/NavRail'
 
const DashboardMenuItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.DashboardOverview}
            IconComponent={DashboardIcon}
            {...rest}
        />       
    )
}

DashboardMenuItem.propTypes = {

}

export default DashboardMenuItem