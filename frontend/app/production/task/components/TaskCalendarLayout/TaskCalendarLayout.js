import React, { useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'

import {
    Grid,
    Typography,
    Paper,
    Button,
    ButtonGroup
} from '@material-ui/core';

import TaskCalendar from '../TaskCalendar'
import TaskSmallCard from '../TaskSmallCard'

const Container = styled(Grid)`
    height: 100%;
`

const TaskCard = styled(props => <TaskSmallCard {...props}/>)`
    margin: 15px 5px;
`

const UpcomingTitle = styled(Typography)`
    margin-top: 10px;
    margin-left: 15px;
`

const TaskUpcoming = ({

}) => {
    return (
        <Grid
            container
            direction="column"
            alignItems="stretch"
        >
            <Grid item xs={12}>
                <UpcomingTitle variant="h6">
                    2 Events
                </UpcomingTitle>
            </Grid>
            <Grid item xs={12}>
                <TaskCard />
                <TaskCard />
            </Grid>
        </Grid>
    )
}

const TaskCalendarLayout = ({
    ...props
}) => {

    const [showSide, setShowSide] = useState(true)

    return (
      <Container
        container
        alignItems="stretch"
      >
        <Grid item xs={9}>
          <TaskCalendar 
          />
        </Grid>
        <Grid item xs={3}>
            <TaskUpcoming />
        </Grid>
      </Container>
        
    )
}

TaskCalendarLayout.propTypes = {
    disabled: PropTypes.bool,

}

export default TaskCalendarLayout