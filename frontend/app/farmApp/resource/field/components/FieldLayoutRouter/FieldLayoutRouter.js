import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

import { 
    ViewButtonGroup
} from 'components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    Grid,
    Drawer,
} from '@material-ui/core';

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import FieldMasterDetail from '../FieldMasterDetail/FieldMasterDetail'


const Container = styled.div`
    //padding: 0px 20px;
    //padding-top: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
`



const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`


const viewLookup = [
    {value: VIEW_MAP, icon: MapIcon},
    {value: VIEW_LIST, icon: ListIcon},
    {value: VIEW_MODULE, icon: ViewModuleIcon},
]


const defaultViewComponents = {
    [VIEW_MAP]: FieldMasterDetail,
    [VIEW_LIST]: FieldMasterDetail,
    [VIEW_MODULE]: FieldMasterDetail,
}

const FieldLayoutRouter = ({
    viewComponents=defaultViewComponents,
    children,
    ...props
}) => {


    return (
        <Container>
            <TableHeader
                title={messages.title}
            >   
                <Grid
                    container
                    justify="flex-end"
                >
                    <Grid item xs={8}>
                        {children}
                    </Grid>
                    <FlexGrid item xs={4}>      
                        <Spacer />
                        <ViewButtonGroup
                            items={viewLookup}
                        />                      
                    </FlexGrid>
                </Grid>
            </TableHeader>                            
            {viewLookup.map(({value}) => {
                const Component = viewComponents[value]
                return (
                    <HashRoute key={`route-${value}`} path={value} component={props => <Component {...props} />} />    
                )
            })}
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_MAP}} />} />
        </Container>
    )
}

/*
<FieldSummaryStats />
*/

FieldLayoutRouter.propTypes = {
    viewComponents: PropTypes.object
}

export default FieldLayoutRouter