import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import BeenhereIcon from '@material-ui/icons/Beenhere';
import { MenuItem } from 'components'
 
const TraceabilityMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.BlockList}
            IconComponent={BeenhereIcon}
            {...rest}
        />       
    )
}

TraceabilityMenuItem.propTypes = {

}

export default TraceabilityMenuItem