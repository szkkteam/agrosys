import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import {
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

const PageHeader = ({
    items,
    value,
    redirectTo=null,
    ...props
}) => {
    const redirectRoute = ROUTE_MAP[redirectTo ?? items[0].to]
    const isMatchFound = !_.isNull(value)

    const {
        appBarTabsRef,
    } = useContext(AppContext)
    
  
    return (
        <Portal container={appBarTabsRef.current}>
            { !isMatchFound
                ? <Redirect to={redirectRoute.toPath()} />
                : <Tabs
                    value={value}
                    orientation="horizontal"
                    variant="scrollable"
                    scrollButtons="auto"
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
                    { items && items.map((item, i) => {
                        const { to, label, value, ...params } = item
                        return <StyledTab key={i} to={to} label={label} params={{...params}} value={value} />
                    }
                            
                    )}
                </Tabs> 
            }
        </Portal>           
    )
}

PageHeader.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })),
    value: PropTypes.any,
    redirectTo: PropTypes.string,
}

export default PageHeader




