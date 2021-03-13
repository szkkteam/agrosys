import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { 
    useCreateTask,
    useTreatmentDialog
} from '../../hooks'

import { 
    MasterList,
    DataLoading
} from 'components'

import TaskAddButton from '../TaskAddButton/TaskAddButton'
import TaskListItem from '../TaskListItem/TaskListItem'


const TaskButton = styled(TaskAddButton)`
    width: calc(100% - 2 * 5px);
    margin: 0 5px;
`

const TaskMasterList = ({
    ...props
}) => {
    // TODO: Get current season
    const season = 2021

    const openDialog = useTreatmentDialog()

    const handleCreateTask = useCreateTask({season})
    
    const handleSelect = (id) => {
        openDialog({

        })
    }

    return (
        <MasterList
            options={{
                maxHeight: 570,
            }}
            onSelect={handleSelect}
            addButton={
                <TaskButton
                    onClick={handleCreateTask}
                />
            }
            {...props}
        >
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            
        </MasterList>
    )
}

TaskMasterList.propTypes = {

}

export default TaskMasterList