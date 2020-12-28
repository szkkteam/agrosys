import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { withLinkComponent } from 'utils/hoc'

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

import { 
    HeaderContentContext,
    MasterDetail,
    MasterList,
    ViewButtonGroup
} from 'components'

import {
    Grid,
} from '@material-ui/core';

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab'

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
    BlockViewButtons,
    BlockList,
    BlockListItem,
    BlockCreateButton
} from '../../components'

import { LeafletMap } from 'components/Map/components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const BottomButton = styled(forwardRef((props, ref) => <BlockCreateButton {...props} ref={ref} /> ))`
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


const BlockMasterDetail = ({

}) => {

    const handleSelect = (data) => {
        console.debug("Selected: ", data)
    }

    return (
        <MasterDetail
        >
            <MasterList
                onSelect={handleSelect}
                addButton={
                    <BottomButton />
                }
            >
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
            </MasterList>
            <LeafletMap />
        </MasterDetail>
    )
}

const BlockRoutes = ({

}) => {
    return (
        <>
            <HashRoute path={VIEW_MAP} component={props => <BlockMasterDetail {...props} />} />
            <HashRoute path={VIEW_LIST} component={props => <BlockMasterDetail {...props} />} />
            <HashRoute path={VIEW_MODULE} component={props => <BlockMasterDetail {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_MAP}} />} />
        </>
    )
}

const BlockLayout = ({
    history,
    match,
}) => {

    const location = useLocation()

    const views = [
        {value: VIEW_MAP, icon: MapIcon},
        {value: VIEW_LIST, icon: ListIcon},
        {value: VIEW_MODULE, icon: ViewModuleIcon},
    ]


    // TODO: Based on the URL query param, change the view later
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
                        <Grid item xs={9}>
                        </Grid>
                        <FlexGrid item xs={3}>      
                            <Spacer />
                            <ViewButtonGroup
                                items={views}
                            />                      
                        </FlexGrid>
                    </Grid>
                </TableHeader>
                <BlockRoutes />
            </Table>        
        </Container>
    )
}

BlockLayout.propTypes = {

}

export default BlockLayout