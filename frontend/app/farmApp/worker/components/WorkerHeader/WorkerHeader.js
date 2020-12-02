import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import { Tabs, TabLink } from 'components'

import { TAB_WORKERS, TAB_ROLES } from '../../constants'


/**
 * 1) Header should contain some quick information and statistics (with links or dropdowns)
 * 1.1) Header can also contain the diffent views? (Or put them on the direct page) 
 * 2) Content should be a master detail list
 * 2.1) Master should be a list of available tabs
 * 2.2) Detail should be the actual selected tab
 */

const WorkerHeader = ({
    match,
    ...props
}) => {
    const intl = useIntl()

    const ROUTE_WORKER = `${match.path}/${TAB_WORKERS}`
    const ROUTE_ROLE = `${match.path}/${TAB_ROLES}`

    return (
            <Grid 
                container
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={8}>
                    <Tabs
                        routes={[ROUTE_WORKER, ROUTE_ROLE]}
                        defaultRoute={ROUTE_WORKER}
                        orientation="horizontal"
                    >
                        <TabLink value={ROUTE_WORKER} label={intl.formatMessage(messages.tabWorkerTitle)} />
                        <TabLink value={ROUTE_ROLE} label={intl.formatMessage(messages.tabRolesTitle)} />
                    </Tabs>
                </Grid>
                <Grid item xs={4}>                            
                    <div>Icon statistics</div>
                </Grid>                
            </Grid>             
    )
}

WorkerHeader.propTypes = {
    match: PropTypes.object.isRequired,
}

export default WorkerHeader

