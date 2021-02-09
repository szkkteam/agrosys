import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { MenuItem } from 'components'
 
const ExpenseMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.ExpenseDashboard}
            IconComponent={RemoveCircleIcon}
            {...rest}
        />       
    )
}

ExpenseMenuItem.propTypes = {

}

export default ExpenseMenuItem