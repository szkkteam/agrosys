import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import ReceiptIcon from '@material-ui/icons/Receipt';
import { MenuItem } from 'components'
 
const TransactionMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.TransactionDashboard}
            IconComponent={ReceiptIcon}
            {...rest}
        />       
    )
}

TransactionMenuItem.propTypes = {

}

export default TransactionMenuItem