import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useHeightDifference } from 'utils/hooks'

import { VIEW_CALENDAR, VIEW_LIST } from '../../constants'

import {
    Grid,
    Portal
} from '@material-ui/core';

import { 
    HeaderContentContext,
} from 'components'

import {
    TaskViewButtons,
    TaskCalendar,
    TaskTable
} from '../../components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const StyledViewButtons = styled(props => <TaskViewButtons {...props} />)`
    float: right;
`

const TaskLayout = ({
    height,
}) => {
    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    const [view, setView] = useState(VIEW_CALENDAR)


    return (
        <Container>
            <Portal container={headerPortalRef.current}>
                <StyledViewButtons
                    value={view}
                    onChange={setView}
                />
            </Portal>
            { view === VIEW_CALENDAR
              ? <TaskCalendar />
              : <TaskTable 
                    height={height}
                />
            }            
        </Container>
    )
}

TaskLayout.propTypes = {

}

export default TaskLayout