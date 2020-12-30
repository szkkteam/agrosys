import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { TaskLayout } from 'farmApp/production/task/components'

const ProductionTabTask = ({
    ...props
}) => {
    return (
            <TaskLayout
            />
    )
}

ProductionTabTask.propTypes = {

}

export default ProductionTabTask
