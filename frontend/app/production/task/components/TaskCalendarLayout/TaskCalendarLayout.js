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

const Container = styled(Grid)`
    height: 100%;
`

const CardContainer = styled(Paper)`
    border-top: 2px solid green;
    padding: 15px;
    width: 100%;
    margin: 15px 5px;
    background-color: #fff;
`

const HalfButton = styled(Button)`
    width: 50%;
`

const GroupContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        width: 80%;
        corner-radius: 10px;
    }
`

const TaskCard = ({

}) => {
    return (
        <CardContainer>
            <Typography variant="h6">
                Harvesting
            </Typography>
            <Typography variant="body2">
                Random title
            </Typography>
            <Typography variant="body2">
                22 sep 2020 - 23 nov 2020
            </Typography>
            <GroupContainer>
                <ButtonGroup
                    variant="outlined"
                    color="primary"
                >
                    <HalfButton
                    >
                        Complete
                    </HalfButton>
                    <HalfButton
                    >
                        On-Plan
                    </HalfButton>
                </ButtonGroup>
            </GroupContainer>
        </CardContainer>
    )
}

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