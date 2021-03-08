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

import Table from '../Table/MuiTable'

const ActionContainer = styled.div`
    ${spacing}
    display: flex;
    align-items: center;

`

const Spacer = styled.div`
    flex-grow: 1;
`


const ListLayout = ({
    title,
    views,
    primaryAction,
    redirectTo,
    onViewChange,
    children,
    ...props
}) => {
  
    return (
        <PageContent
            overflow
            px={2}
        >
            <PageHeader
                title="Pagination"
                breadcrumbs={
                    <Breadcrumbs>
                        <Link color="inherit" href="/">
                            Plans
                        </Link>
                        <Link color="inherit" href="/">
                            Field Plan
                        </Link>
                    </Breadcrumbs>
                }
                py={2}
            >
                <Spacer/>
                <PrimaryActionButton
                    title="New field plan"
                />
            </PageHeader>
            <ActionContainer
                pb={2}
            >
                <Button
                    color="primary"
                    //variant="outlined"
                >
                    Import
                </Button>
                <Button
                    color="primary"
                    //variant="outlined"
                >
                    Export
                </Button>
                <Spacer />
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </ActionContainer>
            <Paper elevation={2}>
                <Tabs
                    value={0}
                >
                    <Tab value={0} label="Tab 1" />
                    <Tab value={1} label="Tab 2" />
                    <Tab value={2} label="Tab 3" />                    
                </Tabs>
                <Divider />
                <div style={{padding: "16px 0"}} />
                <Table
                    data={[
                        {test: "test 1"},
                        {test: "asd"},
                        {test: "bbb"},
                        {test: "cica"},
                    ]}
                    columns={[
                        {
                            title: 'Test',
                            field: 'test'
                        }
                    ]}
                    filterProps={{
                        filters: [
                            {id: '1', title: 'filter 1'},
                            {id: '2', title: 'filter 2'},
                            {id: '3', title: 'filter 3'}
                        ],
                        content: (
                            <div>content</div>
                        )
                    }}
                />
            </Paper>
        </PageContent>
    )
}

ListLayout.propTypes = {
    
}

export default ListLayout