import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'

import Grid from '@material-ui/core/Grid';

import { Tabs, TabLink } from 'components'

const ResourcesHeader = ({
    //match,
    location,
    ...props
}) => {
    const intl = useIntl()

    return (
            <Grid 
                container
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={9}>
                    <Tabs
                        value={location.pathname}
                        orientation="horizontal"
                    >
                        <TabLink to={ROUTES.WorkerList} value={ROUTE_MAP[ROUTES.WorkerList].path} label={intl.formatMessage(messages.tabWorkerTitle)} />
                        <TabLink to={ROUTES.BlockList} value={ROUTE_MAP[ROUTES.BlockList].path} label={intl.formatMessage(messages.tabFieldsTitle)} />
                        <TabLink to={ROUTES.MachineryList} value={ROUTE_MAP[ROUTES.MachineryList].path} label={intl.formatMessage(messages.tabMachineryTitle)} />
                        <TabLink to={ROUTES.EntityList} value={ROUTE_MAP[ROUTES.EntityList].path} label={intl.formatMessage(messages.tabEntitiyTitle)} />
                        <TabLink to={ROUTES.StorageList} value={ROUTE_MAP[ROUTES.StorageList].path} label={intl.formatMessage(messages.tabStorageTitle)} />
                        
                    </Tabs>
                </Grid>
                <Grid item xs={3}>                            
                    <div>Icon statistics</div>
                </Grid>                
            </Grid>             
    )
}

ResourcesHeader.propTypes = {
    match: PropTypes.object.isRequired,
}

export default ResourcesHeader

