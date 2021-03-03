import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import BallotIcon from '@material-ui/icons/Ballot';
import { NavRailItem } from 'components/NavRail'
 
const PlanRailItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.Operation}
            IconComponent={BallotIcon}
            {...rest}
        />       
    )
}

PlanRailItem.propTypes = {

}

export default PlanRailItem