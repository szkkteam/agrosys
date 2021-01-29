import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import DashboardIcon from '@material-ui/icons/Dashboard';
import { MenuItem } from 'components'
 
const DashboardMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
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