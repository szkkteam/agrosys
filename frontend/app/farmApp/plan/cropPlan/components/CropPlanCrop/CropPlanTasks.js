import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useDateFnsLocale } from 'utils/hooks'

import {
    TableBase
} from 'components/Table'

import {
    Typography,
    Avatar,
    Chip
} from '@material-ui/core'

const Flex = styled.div`
    display: flex;
    align-items: center;
`


const CropPlanTasks = ({
    data,
    ...props
}) => {
    const { locale }  = useDateFnsLocale()
    
    const columns = [
        {
            title: 'Task name',
            field: 'title'
        },
        {
            title: 'Date',
            render: (rowData) => (
                <span>
                    {`${format(rowData.startDate, 'yyyy MMMM dd', {locale})}`}
                </span>
            )
        },
        {
            title: 'Type',
            field: 'type'
        }
    ]

    return (
        <TableBase
            data={data}
            columns={columns}
            components={{
                Header: () => null,
                Pagination: () => null,
                Toolbar: () => null,
                Container: (props) => <div {...props}/>
            }}
            options={{
                emptyRowsWhenPaging: false
            }}
        />          
    )
}

CropPlanTasks.propTypes = {

}

export default CropPlanTasks