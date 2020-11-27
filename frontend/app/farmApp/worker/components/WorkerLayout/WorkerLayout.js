import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import { Tabs, TabLink, SearchButton, HeaderContent } from 'components'

import {
    WorkersAdd,
    WorkersTable,
    WorkersFilter,
} from '../WorkerTabWorkers'

import {
    RolesAdd,
    RolesTable,
    RolesFilter
} from '../WorkerTabRoles'

import {
    WorkerFilterButton
} from '../../components'

import { TAB_WORKERS, TAB_ROLES } from '../../constants'


/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */

const WorkerLayout = ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()

    const ROUTE_WORKER = `${match.path}/${TAB_WORKERS}`
    const ROUTE_ROLE = `${match.path}/${TAB_ROLES}`

    return (
        <HeaderContent
                header={
                    <div style={{height: "100%"}}>
                        <Route
                            path={ROUTE_WORKER}
                            exact
                            component={(props) => (
                                <WorkerFilterButton 
                                    title={messages.filterButton}
                                >
                                    <WorkersFilter />
                                </WorkerFilterButton>)}
                        />
                        <Route 
                            path={ROUTE_ROLE}
                            exact
                            component={(props) => 
                                <WorkerFilterButton 
                                    title={messages.filterButton}
                                >
                                    <RolesFilter />
                                </WorkerFilterButton>}
                        />  
                    </div>
                }
                content={ 
                    <Grid 
                        container
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={7}>
                            <Tabs
                                routes={[ROUTE_WORKER, ROUTE_ROLE]}
                                defaultRoute={ROUTE_WORKER}
                                forceDefaultRoute={true}
                                orientation="horizontal"
                            >
                                <TabLink value={ROUTE_WORKER} label={intl.formatMessage(messages.tabWorkerTitle)} />
                                <TabLink value={ROUTE_ROLE} label={intl.formatMessage(messages.tabRolesTitle)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={5}>                            
                            <Route
                                path={ROUTE_WORKER}
                                exact
                                component={(props) => (
                                    <div
                                        style={{flexGrow: 1, marginRight: "15px"}}
                                    >
                                        <WorkersAdd style={{float: "right"}}/>
                                        <SearchButton title={messages.searchButton} style={{float: "right", marginRight: "15px"}}/>
                                    </div>
                                )}
                            />
                            <Route 
                                path={ROUTE_ROLE}
                                exact
                                component={(props) => (
                                    <div
                                        style={{flexGrow: 1, marginRight: "15px"}}
                                    >
                                        <RolesAdd style={{float: "right"}} />
                                        <SearchButton title={messages.searchButton} style={{float: "right", marginRight: "15px"}}/>
                                    </div>
                                )}
                            />  
                        </Grid>
                        <Grid item xs={12} >
                            <Route
                                path={ROUTE_WORKER}
                                exact
                                component={(props) => <WorkersTable {...props}/>}
                            />
                            <Route 
                                path={ROUTE_ROLE}
                                exact
                                component={(props) => <RolesTable {...props} />}
                            />                
                        </Grid>
                    </Grid> 
                }
            />               
    )
}

WorkerLayout.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default WorkerLayout

