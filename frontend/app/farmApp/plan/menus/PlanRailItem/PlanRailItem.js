import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import { NavRailItem } from 'components/NavRail'
 
const PlanRailItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.Plan}
            IconComponent={DeveloperBoardIcon}
            {...rest}
        />       
    )
}

PlanRailItem.propTypes = {

}

export default PlanRailItem