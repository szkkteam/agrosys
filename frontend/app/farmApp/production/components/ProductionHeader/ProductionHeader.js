import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { matchPath } from "react-router-dom"
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

const ProductionHeader = ({
    match,
    location,
    ...props
}) => {
    const intl = useIntl()

    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    const items = [
        {id: 0, label: intl.formatMessage(messages.productionMultiView), to: ROUTES.ProductionMultiView},
        {id: 1, label: "My wheat", to: ROUTES.ProductionDetail},
        {id: 2, label: "My corn", to: ROUTES.ProductionDetail},
    ]
    
    // TODO: This is ugly, try to re-use the router config
    const matched = matchPath(location.pathname, { path: "/productions/:id", strict: true })
    const { id = 0 } = matched? matched.params : 0
    
    return (
            <Grid 
                container
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12}>
                    <PageTitle variant="h5">
                        <FormattedMessage {...messages.title} />
                    </PageTitle>
                </Grid>
                <Grid item xs={9}>
                    <Tabs
                        value={parseInt(id)}
                        orientation="horizontal"
                    >
                        { items && items.map((item, i) => 
                            <TabLink key={i} {...item} params={{id: item.id}} dataProps={{hash: location.hash}}  value={item.id} />
                        )}
                        
                    </Tabs>
                </Grid>
                <Grid item xs={3} ref={headerPortalRef}>                            
                </Grid>                
            </Grid>             
    )
}

ProductionHeader.propTypes = {
    match: PropTypes.object.isRequired,
}

export default ProductionHeader

