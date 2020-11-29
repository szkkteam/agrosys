import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { Table } from 'components'


const WorkerTableLayout = ({
    height,
    ...props
}) => {


    return (
            <Table
                options={{
                    toolbar: false,
                    paging: false,
                    maxBodyHeight: height,
                    headerStyle: { position: 'sticky', top: 0 },
                }}
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
