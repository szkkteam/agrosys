import React, { useEffect, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";

import {
    Grid,
    Portal
} from '@material-ui/core';

import { 
    HeaderContentContext,
} from 'components'

import {
    TaskViewButtons,
    TaskCalendar
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

}) => {
    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)


    return (
        <Container>
            <Portal container={headerPortalRef.current}>
                <StyledViewButtons
                />
            </Portal>
            <TaskCalendar />
        </Container>
    )
}

TaskLayout.propTypes = {

}

export default TaskLayout