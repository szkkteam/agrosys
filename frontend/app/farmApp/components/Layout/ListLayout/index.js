import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import {
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    Button,
    IconButton,
    Tab,
    Tabs,
    Divider,
    TextField,
    InputAdornment
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import { 
    PrimaryActionButton,
    ViewButtonGroup,
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

import FilterTabs from './FilterTabs'
import ActionBar from './ActionBar'

const ActionContainer = styled.div`
    ${spacing}
    display: flex;
    align-items: center;

`

const Spacer = styled.div`
    flex-grow: 1;
`


const ListLayout = ({
    tabs,
    actions,
    primaryAction,
    children,
    ...props
}) => {

    return (
        <PageContent
            overflow='auto'
            px={2}
        >
            <PageHeader
                {...props}                
                py={2}
            >
                <Spacer/>
                {primaryAction}
            </PageHeader>
            {actions && 
                <ActionBar {...actions} />
            }            
            <Paper elevation={2}>
                {tabs && 
                    <>
                        <FilterTabs {...tabs} />
                        <Divider />
                    </>
                }                
                <div style={{padding: "8px 0"}} />
                {children}
                
            </Paper>
        </PageContent>
    )
}

ListLayout.propTypes = {
    actions: ActionBar.propTypes,
    tabs: FilterTabs.propTypes,
    ...PageHeader.propTypes,
}

export default ListLayout