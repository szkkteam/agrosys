import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';


import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import {
    Fab,
    List,
    ListItem,
    Button,
    Paper,
    IconButton,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    ListSubheader
    
} from '@material-ui/core'

const FullHeightCard = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ScrollContent = styled(CardContent)`
overflow-y: hidden;
display: flex;
`

const Header = styled(CardHeader)`
    ${({theme}) => `
        //background-color: ${theme.palette.primary.main};
        //color: ${theme.palette.primary.contrastText};
    `}
    
`

const FloatButton = styled(Fab)`
    position: absolute;
    top: calc(75% + 0px);
    right: 12px;
`

const Background = styled.div`
    ${({theme}) => `
        position: relative;
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        padding-bottom: 15px;
        & .MuiCardHeader-subheader {
            color: ${fade(theme.palette.primary.contrastText, 0.64)};
        }
        & .MuiIconButton-root {
            color: ${fade(theme.palette.primary.contrastText, 1)};
        }
    `}
`

const DashboardCard = ({
    className,
    icon: Icon,
    title,
    subheader,
    children,
    ...props
}) => {
    const intl = useIntl()
    console.debug("Background: ", Background)
    
    return (
        <FullHeightCard className={className}>
            <Background>
                <CardHeader
                    //component={Background}
                    /*
                    avatar={
                        Icon? (
                            <Icon/>
                        ) : (
                            <Avatar aria-label="recipe" >
                            {intl.formatMessage(title).charAt(0)}
                            </Avatar>
                        )
                    }
                    */
                    action={
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={subheader}
                />
                <FloatButton size="small" color="secondary" aria-label="add">
                    <AddIcon />
                </FloatButton>
            </Background>
                
            <ScrollContent>
                <List
                    subheader={
                        <ListSubheader>
                            Search bar here
                        </ListSubheader>
                    }
                >
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                    <ListItem> item 1 </ListItem>
                </List>
            </ScrollContent>
            <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions>
        </FullHeightCard>
    )
}


DashboardCard.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.object.isRequired,
    subheader: PropTypes.object,
}

export default DashboardCard
