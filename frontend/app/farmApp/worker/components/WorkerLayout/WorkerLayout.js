import React, { useContext, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage, useIntl } from 'react-intl'
import styled from 'styled-components'

import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { 
    HeaderContent,
    TabsButton,
    HeaderContentContext,
    Tabs,
    TabLink
} from 'components'

import { useHeightDifference } from 'utils/hooks'

import {
    WorkerTable,
    RoleTable,
} from '../../components'

import {
    TAB_WORKERS,
    TAB_ROLES
} from '../../constants'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

/*
{ value === TAB_WORKERS?
                <WorkerTable
                    height={height}
                />
              : <RoleTable 
                    height={height}
                />
            }
*/

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const TableRoutes = ({
    
}) => {

    const {
        contentHeight,
    } = useContext(HeaderContentContext)

    console.debug("Worker height: ", contentHeight)

    return (
        <>
            <HashRoute path={TAB_WORKERS} component={props => <WorkerTable height={contentHeight} {...props} />} />
            <HashRoute path={TAB_ROLES} component={props => <RoleTable height={contentHeight} {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: TAB_WORKERS}} />} />
        </>
    )
}


const WorkerLayout = ({
    
}) => {
    const intl = useIntl()
    const location = useLocation()

    const tabValues = [
        {value: TAB_WORKERS, title: intl.formatMessage(messages.left)},
        {value: TAB_ROLES, title: intl.formatMessage(messages.right)},
    ]

    return (
        <HeaderContent
            //ref={containerRef}
        >
            <StyledTabs
                value={location.hash || TAB_WORKERS}
                orientation="horizontal"
            >
                { tabValues && tabValues.map((tab, i) => (
                    <TabLink key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title} />  
                ))}                
            </StyledTabs>
            <TableRoutes
            />
        </HeaderContent>
    )
}

/*

*/

WorkerLayout.propTypes = {

}

export default WorkerLayout