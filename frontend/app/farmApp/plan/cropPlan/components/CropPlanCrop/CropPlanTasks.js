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
import { getTaskTypeFromId } from 'farmApp/operation/task/constants'

import {
    Typography,
    Avatar,
    Chip
} from '@material-ui/core'

import { useSelectTasksByCropPlan } from '../../hooks'

const Flex = styled.div`
    display: flex;
    align-items: center;
`


const CropPlanTasks = ({
    cropPlanId,
    data,
    ...props
}) => {
    const { locale }  = useDateFnsLocale()
    const { payload, isLoading } = useSelectTasksByCropPlan(cropPlanId)
    
    const columns = [
        {
            title: 'Task name',
            field: 'title'
        },
        {
            title: 'Date',
            render: (rowData) => (
                <span>
                    {`${format(new Date(rowData.dates.start), 'yyyy MMMM dd', {locale})}`}
                </span>
            )
        },
        {
            title: 'Type',
            render: (rowData) => {
                const { title } = getTaskTypeFromId(rowData.type)
                return (
                    <FormattedMessage {...title} />
                )
            }
        }
    ]
    //{`${format(new Date(rowData.start), 'yyyy MMMM dd', {locale})}`}
    return (
        <TableBase
            isLoading={isLoading}
            data={payload}
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