import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, matchPath } from 'react-router-dom'
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

const ProductionHeader = ({
    match,
    location,
    ...props
}) => {
    const intl = useIntl()

    const {
        appBarTabsRef,
    } = useContext(AppContext)
    
    //const matched = location.pathname.match("(\/\\w+){2}")
    //const route = ROUTE_MAP[ROUTES.ProductionMultiView]  


    const items = [
        {id: 0, label: intl.formatMessage(messages.productionMultiView), to: ROUTES.ProductionMultiView},
        {id: 1, label: "My wheat", to: ROUTES.ProductionDetail},
        {id: 2, label: "My corn", to: ROUTES.ProductionDetail},
    ]
    
    // TODO: This is ugly, try to re-use the router config
    const matched = matchPath(location.pathname, { path: "/productions/:id", strict: true })
    const id = parseInt(matched? matched.params : 0)

    console.debug("matched: ", matched)
    console.debug("id: ", id)
    //const { id = 0 } = matched? matched.params : 0
    
    return (
        <Portal container={appBarTabsRef.current}>
            { false
                ? <Redirect to={route.toPath()}/> 
                : <Tabs
                    value={_.isNaN(id)? 0 : id}
                    //value={matched? matched[0] : location.pathname}
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
                    { items && items.map((item, i) => 
                            <StyledTab key={i} {...item} params={{id: item.id}} dataProps={{hash: location.hash}}  value={item.id} />
                    )}
                </Tabs>
            }
        </Portal>           
    )
}

ProductionHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default ProductionHeader




