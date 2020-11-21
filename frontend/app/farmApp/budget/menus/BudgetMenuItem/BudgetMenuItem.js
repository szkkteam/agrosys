import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { MenuItem } from 'components'
 
const BudgetMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.BudgetDashboard}
            IconComponent={AccountBalanceWalletIcon}
            {...rest}
        />       
    )
}

BudgetMenuItem.propTypes = {

}

export default BudgetMenuItem