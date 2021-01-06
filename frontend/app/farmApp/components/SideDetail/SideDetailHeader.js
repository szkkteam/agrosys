import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { withLinkComponent } from 'utils/hoc'

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import {
    Grid,
    Button,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
    Chip,
    Tabs,
    Tab,
    CardContent,
    CardActions,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';

const Icon = styled(CloseIcon)`
    color: #fff;
`

const StyledToolbar = styled(Toolbar)`
    padding: 0 12px;
`


const Flex = styled.div`
    display: flex;
    align-items: center;
`


const Spacer = styled.div`
    flex-grow: 1;
`

const List = styled.ul`
    list-style: none;
    display: flex;
    padding-left: 0;
    margin-top: 0;
`

const ListItem = styled.li`
    padding: 0 10px;
`

const WideChip = styled(Chip)`
    width: 90px;
`

const FullWidthTabs = styled(Tabs)`
    width: 100%;
`

const tabProps = (index) => {
    return {
        id: `${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const SideDetailHeader = ({    
    title,
    value,    
    tabs,
    data,
    onTabChange,
    onClose,
    buttons,
    ...props
}) => {
    const intl = useIntl()

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
                            {title}
                        </Typography>
                        <Spacer />
                        <IconButton aria-label="close" onClick={onClose}>
                            <Icon />
                        </IconButton>
                    </Flex>        
                    </Grid>
                    {buttons 
                        ? <List>
                            { buttons.map(({icon: Icon = EditIcon, title, onClick}, i) => {

                                const handleClick = (localOnClick, param) => (e) => {
                                    e.stopPropagation()
                                    localOnClick && localOnClick(e, param)
                                    onClose && onClose()
                                }
                                return (
                                    <ListItem key={i}>
                                        <WideChip
                                            icon={<Icon />}
                                            clickable
                                            label={intl.formatMessage(title)}
                                            onClick={handleClick(onClick, data)}
                                        />
                                   </ListItem>
                                )
                            })}
                        </List>
                        : null
                    }
                    {tabs
                        ? (
                            <FullWidthTabs
                                value={value}
                                onChange={onTabChange}
                                variant="fullWidth"
                            >
                                { tabs.map(({title}, i) => (
                                    <Tab key={i} value={i} label={intl.formatMessage(title)} {...tabProps(i)}/>
                                ))}
                            </FullWidthTabs>
                        )
                        : null
                    }                      
                </Grid>                        
            </StyledToolbar>
        </AppBar>   
    )
}


SideDetailHeader.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.object.isRequired,
        icon: PropTypes.element,
        onClick: PropTypes.func
    })),
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.object.isRequired,
    }))
}

export default SideDetailHeader