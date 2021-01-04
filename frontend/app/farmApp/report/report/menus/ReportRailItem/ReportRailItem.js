import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AssessmentIcon from '@material-ui/icons/Assessment';
import { NavRailItem } from 'components/NavRail'
 
const DashboardMenuItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.Report}
            IconComponent={AssessmentIcon}
            {...rest}
        />       
    )
}

DashboardMenuItem.propTypes = {

}

export default DashboardMenuItem