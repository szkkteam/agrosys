import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { MenuItem } from 'components'
 
const MachineryMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.ResourceMachinery}
            IconComponent={LocalShippingIcon}
            {...rest}
        />       
    )
}

MachineryMenuItem.propTypes = {

}

export default MachineryMenuItem