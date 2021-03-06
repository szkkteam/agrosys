import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { useCreateTask } from '../../hooks'

import { 
    MasterList,
    DataLoading
} from 'components'

import {
    Button
} from '@material-ui/core'

import OperationAddButton from '../OperationAddButton/OperationAddButton'
import OperationListItem from '../OperationListItem/OperationListItem'


const TaskButton = styled(OperationAddButton)`
    width: calc(100% - 2 * 5px);
    margin: 0 5px;
`

const OperationMasterList = ({
    ...props
}) => {
    // TODO: Get current season
    const season = 2021

    const handleCreateTask = useCreateTask({season})
    

    return (
        <MasterList
            options={{
                maxHeight: 570,
            }}
            addButton={
                <TaskButton
                    onClick={handleCreateTask}
                />
            }
            {...props}
        >
            <OperationListItem />
            <OperationListItem />
            <OperationListItem />
            <OperationListItem />
            
        </MasterList>
    )
}

OperationMasterList.propTypes = {

}

export default OperationMasterList