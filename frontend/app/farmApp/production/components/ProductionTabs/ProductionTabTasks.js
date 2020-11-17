import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { TaskCalendar } from 'farmApp/task/components'

const ProductionTabTask = ({
    ...props
}) => {
    return (
            <TaskCalendar
            />
    )
}

ProductionTabTask.propTypes = {

}

export default ProductionTabTask
