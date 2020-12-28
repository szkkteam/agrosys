import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { withLinkComponent } from 'utils/hoc'

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

import { 
    MasterList,
    MasterDetail,
    SideSheet,
    ViewButtonGroup
} from 'components'

import { LeafletMap } from 'components/Map/components'

import {
    Grid,
    Drawer,
} from '@material-ui/core';

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';


import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    FieldCreateButton,
    FieldListItem,
    FieldSummaryStats,
    FieldSideDetail
} from '../../components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const BottomButton = styled(forwardRef((props, ref) => <FieldCreateButton {...props} ref={ref} /> ))`
    position: absolute;
    margin-bottom: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
`


const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const FieldMasterDetail = ({
    
}) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (data) => {
        setSelected(!!selected? null : data)
    }

    const handleClose = () => {
        setSelected(null)
    }

    return (
        <MasterDetail
        >
            <MasterList
                onSelect={handleSelect}
                options={{
                    maxHeight: 570,
                }}
                addButton={
                    <BottomButton
                    />
                }
            >
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
                <FieldListItem />
            </MasterList>
            <SideSheet
                open={!!selected}
            >
                <LeafletMap />
                <FieldSideDetail
                    onClose={handleClose}
                />
            </SideSheet>
        </MasterDetail>
    )
}


const FieldRoutes = ({
    
}) => {

    return (
        <>
            <HashRoute path={VIEW_MAP} component={props => <FieldMasterDetail {...props} />} />
            <HashRoute path={VIEW_LIST} component={props => <FieldMasterDetail {...props} />} />
            <HashRoute path={VIEW_MODULE} component={props => <FieldMasterDetail {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_MAP}} />} />
        </>
    )
}

const FieldLayout = ({
    location,
    ...props
}) => {

    const views = [
        {value: VIEW_MAP, icon: MapIcon},
        {value: VIEW_LIST, icon: ListIcon},
        {value: VIEW_MODULE, icon: ViewModuleIcon},
    ]

    return (
        <Container>
            <Table
            >
                <TableHeader
                    title={messages.title}
                >   
                    <Grid
                        container
                        justify="flex-end"
                    >
                        <Grid item xs={8}>
                            <FieldSummaryStats />
                        </Grid>
                        <FlexGrid item xs={4}>      
                            <Spacer />
                            <ViewButtonGroup
                                items={views}
                            />                      
                        </FlexGrid>
                    </Grid>
                </TableHeader>
                <FieldRoutes 
                />
            </Table>        
        </Container>
    )
}

FieldLayout.propTypes = {

}

export default FieldLayout