import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { MenuItem } from 'components'
 
const SaleMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.SaleDashboard}
            IconComponent={AddCircleIcon}
            {...rest}
        />       
    )
}

SaleMenuItem.propTypes = {

}

export default SaleMenuItem