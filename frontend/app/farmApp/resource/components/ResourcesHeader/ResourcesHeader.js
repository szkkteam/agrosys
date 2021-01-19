import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'

import {
    Grid,
    Typography,
    Portal
} from '@material-ui/core';

import AppContext from 'components/AppContext'

import { Tabs, TabLink } from 'components'


const StyledTab = styled(props => <TabLink {...props}/>)`
    ${({ theme }) => `
        &.Mui-selected {
            color: ${theme.palette.primary.main}
        }
    `}
    
`

const ResourcesHeader = ({
    match,
    location,
    ...props
}) => {
    const intl = useIntl()

    const {
        appBarTabsRef,
    } = useContext(AppContext)

    const matched = location.pathname.match("(\/\\w+){2}")
    const route = ROUTE_MAP[ROUTES.BlockList]  

    return (
        <Portal container={appBarTabsRef.current}>
            { !matched
                ? <Redirect to={route.toPath()}/> 
                : <Tabs
                    value={matched? matched[0] : location.pathname}
                    orientation="horizontal"
                    TabIndicatorProps={{
                        style: {
                            height: "85%",
                            backgroundColor: "white",
                            zIndex: "-1",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",

                        }
                    }}
                >
                    <StyledTab to={ROUTES.MachineryList} value={ROUTE_MAP[ROUTES.MachineryList].path} label={intl.formatMessage(messages.tabMachineryTitle)} />
                    <StyledTab to={ROUTES.WorkerList} value={ROUTE_MAP[ROUTES.WorkerList].path} label={intl.formatMessage(messages.tabWorkerTitle)} />
                    <StyledTab to={ROUTES.EntityList} value={ROUTE_MAP[ROUTES.EntityList].path} label={intl.formatMessage(messages.tabEntitiyTitle)} />
                    
                </Tabs>
            }
        </Portal>           
    )
}

/*
<Portal container={appBarTabsRef.current}>
            { !matched
                ? <Redirect to={route.toPath()}/> 
                : <Grid 
                    container
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Tabs
                            value={matched? matched[0] : location.pathname}
                            orientation="horizontal"
                        >
                            <TabLink to={ROUTES.BlockList} value={ROUTE_MAP[ROUTES.BlockList].path} label={intl.formatMessage(messages.tabFieldsTitle)} />
                            <TabLink to={ROUTES.MachineryList} value={ROUTE_MAP[ROUTES.MachineryList].path} label={intl.formatMessage(messages.tabMachineryTitle)} />
                            <TabLink to={ROUTES.WorkerList} value={ROUTE_MAP[ROUTES.WorkerList].path} label={intl.formatMessage(messages.tabWorkerTitle)} />
                            <TabLink to={ROUTES.EntityList} value={ROUTE_MAP[ROUTES.EntityList].path} label={intl.formatMessage(messages.tabEntitiyTitle)} />
                            
                        </Tabs>
                    </Grid>
                </Grid>  
            }
        </Portal>  
*/

//<TabLink to={ROUTES.StorageList} value={ROUTE_MAP[ROUTES.StorageList].path} label={intl.formatMessage(messages.tabStorageTitle)} />

ResourcesHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default ResourcesHeader

