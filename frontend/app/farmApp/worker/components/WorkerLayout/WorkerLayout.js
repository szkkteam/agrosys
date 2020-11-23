import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import { useQuery } from 'utils/hooks'

import {
    WorkerTabWorkers,
    WorkerTabRoles,
    WorkerAddButton
} from '../../components'

import { TAB_WORKERS, TAB_ROLES } from '../../constants'


/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */


const tabProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}


const WorkerLayout = ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()
    const query = useQuery()


    const tabLookup = useMemo(() => [
        { 
            id: TAB_WORKERS,
            Component: WorkerTabWorkers,
            Title: (props) => <Tab label={intl.formatMessage(messages.tabWorkerTitle)} {...props} />,
            AddButton: (props) => <WorkerAddButton title={messages.addWorkerTitle} {...props} />
         },
        { 
            id: TAB_ROLES,
            Component: WorkerTabRoles,
            Title: (props) => <Tab label={intl.formatMessage(messages.tabRolesTitle)} {...props} /> ,
            AddButton: (props) => <WorkerAddButton title={messages.addRoleTitle} {...props} />
        },
    ])

    const currentTab = () => _.findIndex(tabLookup, {id: query.get('tab') || TAB_WORKERS})

    useEffect(() => {
        switch(query.get('tab')) {
            case TAB_WORKERS:
            case TAB_ROLES:
                break 
            default: 
                // TODO: Get the prefered view from storage/redux and apply
                history.replace(`${match.url}?tab=${TAB_WORKERS}`)
        }
    }, [query])


    const handleTabChange = (e, newValue) => {
        const { id } = tabLookup[newValue]
        history.push(`${match.url}?tab=${id}`)
    }

    return (
        <Grid 
            container
            alignItems="center"
            spacing={1}
        >
            <Grid item xs={10}>
                <Tabs
                    orientation="horizontal"
                    //centered
                    value={currentTab()}
                    onChange={handleTabChange}
                >
                    { tabLookup.map((tab, i) => 
                        tab.Title({key: `tab-index-${i}`, ...tabProps(i)}) 
                    ) }
                </Tabs>
            </Grid>
            <Grid item xs={2}>
                { tabLookup[currentTab()].AddButton() }
            </Grid>
            <Grid item xs={12} >
                <Route render={props => {
                    const { Component } = tabLookup[currentTab()]  
                    return (
                        <Component
                            location={location}
                            history={history}
                            match={match}
                            {...props}
                        />
                        )
                    }}
                />
            </Grid>
        </Grid>        
    )
}

WorkerLayout.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default WorkerLayout
