import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'

import {
    Grid,
    Typography
} from '@material-ui/core';

import { HeaderContentContext } from 'components'

import { Tabs, TabLink } from 'components'

const PageTitle = styled(Typography)`
    margin-top: 15px;
`

const ResourcesHeader = ({
    match,
    location,
    ...props
}) => {
    const intl = useIntl()

    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    const matched = location.pathname.match("(\/\\w+){2}")

    return (
            <Grid 
                container
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12}>
                    <PageTitle variant="h5">
                        <FormattedMessage {...messages.pageTitle} />
                    </PageTitle>
                </Grid>
                <Grid item xs={9}>
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
                <Grid item xs={3} ref={headerPortalRef}>                            
                </Grid>                
            </Grid>             
    )
}

//<TabLink to={ROUTES.StorageList} value={ROUTE_MAP[ROUTES.StorageList].path} label={intl.formatMessage(messages.tabStorageTitle)} />

ResourcesHeader.propTypes = {
    match: PropTypes.object.isRequired,
}

export default ResourcesHeader

