import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AssessmentIcon from '@material-ui/icons/Assessment';
import { MenuItem } from 'components'
 
const ReportMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.ReportDashboard}
            IconComponent={AssessmentIcon}
            {...rest}
        />       
    )
}

ReportMenuItem.propTypes = {

}

export default ReportMenuItem