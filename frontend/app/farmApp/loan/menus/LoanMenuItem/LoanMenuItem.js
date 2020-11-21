import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import CreditCardIcon from '@material-ui/icons/CreditCard';
import { MenuItem } from 'components'
 
const LoanMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.LoanDashboard}
            IconComponent={CreditCardIcon}
            {...rest}
        />       
    )
}

LoanMenuItem.propTypes = {

}

export default LoanMenuItem