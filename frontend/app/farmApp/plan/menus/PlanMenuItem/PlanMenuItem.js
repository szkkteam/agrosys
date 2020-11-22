import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AssignmentIcon from '@material-ui/icons/Assignment';
import { MenuItem } from 'components'
 
const PlanMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.PlanList}
            IconComponent={AssignmentIcon}
            {...rest}
        />       
    )
}

PlanMenuItem.propTypes = {

}

export default PlanMenuItem