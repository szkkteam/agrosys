import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { TableBody } from 'components/Table'


const WorkerTableLayout = ({
    height,
    ...props
}) => {


    return (
            <TableBody
                components={{
                    //Header: TableHeader
                }}
                {...props}
            />
    )
}

WorkerTableLayout.propTypes = {

}

export default WorkerTableLayout
