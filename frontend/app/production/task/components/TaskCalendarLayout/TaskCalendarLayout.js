import React, { useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'

import { 
    SideSheet,
} from 'components'

import CloseIcon from '@material-ui/icons/Close';

import {
    Grid,
    Typography,
    IconButton,
    Button,
    ButtonGroup
} from '@material-ui/core';

import TaskCalendar from '../TaskCalendar'
import TaskSmallCard from '../TaskSmallCard'

const Container = styled.div`
    height: 100%;
    width: 100%;
`

const TaskCard = styled(props => <TaskSmallCard {...props}/>)`
    margin: 15px 5px;
`

const FullWidthCalendar = styled(props => <TaskCalendar {...props} />)`
    width: 100%;
`

const UpcomingTitle = styled(Typography)`
    margin-left: 15px;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const TaskUpcoming = ({
    onClose,
    ...props
}) => {
    return (        
        <Grid
            container
            spacing={0}
            direction="row"
            //justify="center"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item xs={12}>
                <Flex>
                    <UpcomingTitle variant="h6">
                        2 Events
                    </UpcomingTitle>
                    <Spacer />
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Flex>        
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

    const handleSide = () => {
        setShowSide(false)
    }

    return (
      <Container>
        <SideSheet
            open={showSide}
        >
          <FullWidthCalendar />
          <TaskUpcoming 
            onClose={handleSide}
          />
        </SideSheet>
      </Container>
        
    )
}

TaskCalendarLayout.propTypes = {
    disabled: PropTypes.bool,

}

export default TaskCalendarLayout