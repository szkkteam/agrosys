import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import globalMessages from 'messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { withLinkComponent } from 'utils/hoc'

import CloseIcon from '@material-ui/icons/Close';

import {
    Grid,
    Button,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
    Tab,
    Tabs,
    Card,
    CardContent,
    CardActions,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';

import {
    TaskSmallCard
} from 'farmApp/cropProduction/task/components'

const Container = styled(Grid)`
    //padding: 0 0 0 12px;
    position: relative;
`

const StyledToolbar = styled(Toolbar)`
    padding: 0 12px;
`

const Content = styled(Grid)`
    overflow-y: scroll;
    height: 630px;
    padding: 0 12px;
    padding-bottom: 24px;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const SectionContainer = styled.div`
    margin: 10px 0;
    width: 100%;
`

const floatButtonWidth = 300
const FloatButton = styled(Button)`
    position: absolute;
    width: ${floatButtonWidth}px;
    //margin: 0 auto;
    bottom: 10px;
    left: 50%;
    margin-left: -${floatButtonWidth/2}px;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const DetailHeader = ({
    onClose,
}) => {
    return (
        <AppBar
            position="initial"
        >
            <StyledToolbar>
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
                        <Typography variant="h6">
                            Parcel 1
                        </Typography>
                        <Spacer />
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Flex>        
                    </Grid>
                    <Grid item xs={4}>
                        <Button>
                            Edit
                        </Button>                
                    </Grid>
                    <Grid item xs={4}>
                        <Button>
                            Delete
                        </Button>                
                    </Grid>
                    <Grid item xs={4}>
                        <Button>
                            Whatever
                        </Button>                
                    </Grid>     
                </Grid>                        
            </StyledToolbar>
        </AppBar>   
    )
}

const SuggestionsBox = styled.div`
    padding: 5px 0;
    background-color: lightgrey;
    width: 100%;
    height: 50px;
    text-align: center;
`

const DetailSuggestions = ({

}) => {
    return (
        <SectionContainer>
            <Typography variant="body1">
                Suggestions
            </Typography>
            <SuggestionsBox>
                No suggestions
            </SuggestionsBox>
        </SectionContainer>
    )
}

const TAB_PESTS = "pests"
const TAB_NUTRIENTS = "nutriens"

const DetailFieldStatus = ({

}) => {
    const [tab, setTab] = useState(TAB_PESTS)

    const handleChange = (e, v) => {
        setTab(v)
    }

    return (
        <SectionContainer>
            <Flex>
                <Typography variant="body1">
                    The field status
                </Typography>
                <Spacer />
                <Button 
                    color="primary"                    
                >
                    Full screen
                </Button>
            </Flex>
            <Tabs
                value={tab}
                onChange={handleChange}
            >
                <Tab value={TAB_PESTS} label="Pests" />
                <Tab value={TAB_NUTRIENTS} label="Nutrient" />
            </Tabs>
            { tab === TAB_PESTS
                ? <div style={{width: "100%", height: "100px"}}>Pests</div>
                : <div style={{width: "100%", height: "100px"}}>Nutrients</div>
            }
        </SectionContainer>
    )
}

const GrowthStage = ({

}) => {
    return (
        <SectionContainer>
            <Flex>
                <Typography variant="body1">
                    Growth stage
                </Typography>
                <Spacer />
                <Button
                    color="primary"
                >
                    Edit growth stage
                </Button>
            </Flex>
            <Grid
                container
            >
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        Current
                    </Typography>
                    <Typography variant="body1">
                        BBCH 13
                    </Typography>
                    <Typography variant="body2">
                        3 leaf stage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        december 19
                    </Typography>
                    <Typography variant="body1">
                        BBCH 21
                    </Typography>
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur
                    </Typography>
                </Grid>
            </Grid>           
        </SectionContainer>
    )
}

const DetailWeather = ({

}) => {
    return (
        <SectionContainer>
            <Flex>
                <Typography variant="body1">
                    Weather
                </Typography>
                <Spacer />
                <Button
                    color="primary"
                >
                    full screen
                </Button>
            </Flex>
            <Grid
                container
            >
                {["Today","Saturday","Sunday","Monday",].map(i => (
                    <Grid item xs={3} key={i}>
                        <Typography variant="body1">
                            {i}
                        </Typography>
                        <Typography variant="caption">
                            6°/1°
                        </Typography>
                        <Typography variant="body2">
                            1 mm
                        </Typography>
                        <Typography variant="body2">
                            3 m/s
                        </Typography>
                    </Grid>
                ))}                
            </Grid>
        </SectionContainer>
    )
}


const FullButton = styled(Button)`
    width: 100%;
`

const DetailTask = ({

}) => {
    return (
        <SectionContainer>
            <Flex>
                <Typography variant="body1">
                    Tasks
                </Typography>
                <Spacer />
                <Button
                    color="primary"
                >
                    show tasks (12)
                </Button>
            </Flex>
            <Grid
                direction="column"
                container
            >
                { [1,2,3].map(i => (
                <Grid item xs={12} key={i}>
                    <TaskSmallCard />                   
                </Grid>
                ))}               
            </Grid>
        </SectionContainer>
    )
}
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledGrid = styled(Grid)`
    padding: 0 8px;
`

const DetailNotes = ({

}) => {
    return (
        <SectionContainer>
            <Flex>
                <Typography variant="body1">
                    Notes
                </Typography>
            </Flex>
            <Grid
                direction="row"
                container
            >
                {[1,2,3].map(i => (
                <StyledGrid item xs={3} key={i}>
                    <Card>
                        <StyledCardContent>
                            <IconButton>
                                <InsertDriveFileIcon />
                            </IconButton>
                            <Typography variant="caption">
                                Oberserved...
                            </Typography>
                        </StyledCardContent>
                    </Card>
                </StyledGrid>
                ))}
                <StyledGrid item xs={3}>
                    <Card>
                        <StyledCardContent>
                            <IconButton>
                                <NoteAddIcon />
                            </IconButton>
                            <Typography variant="caption">
                                Add note
                            </Typography>
                        </StyledCardContent>
                    </Card>
                </StyledGrid>
            </Grid>
        </SectionContainer>
    )
}

const DetailContent = ({

}) => {
    return (
        <>
            <DetailSuggestions />
            <DetailFieldStatus />
            <GrowthStage />
            <DetailWeather />
            <DetailTask />
            <DetailNotes />
        </>
        
    )
}

const FieldSideDetail = ({
    onClose,
    ...props
}) => {
    return (        
        <Container
            container
            spacing={0}
            direction="row"
            //justify="center"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item xs={12}>
                <DetailHeader 
                    onClose={onClose}
                />
            </Grid>
            <Content item xs={12}>
                <DetailContent />
            </Content>      
            <FloatButton
                variant="contained"
                color="primary"
            >
                Add new task
            </FloatButton> 
        </Container>
        
    )
}

FieldSideDetail.propTypes = {

}

export default FieldSideDetail