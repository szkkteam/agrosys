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
    MasterDetail
} from 'components'

import { LeafletMap } from 'components/Map/components'

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab'

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
    FieldListItem
} from 'farmApp/production/field/components'

import {
    SummaryHeader,
    SummaryDetail
} from '../../components'
import { Grid } from '@material-ui/core'

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

const FieldViews = ({
    view,
    handleChange,
    ...props
}) => {
    const onClick = (e, v) => {
        handleChange && handleChange(v)
    }

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={onClick}
            aria-label="block view"
            {...props}
        >
            <ToggleButton value={VIEW_MAP} aria-label="map view">
                <MapIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_LIST} aria-label="list view">
                <ListIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_MODULE} aria-label="module view">
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

const MapContainer = styled(Grid)`
    height: 100%;
`

const MapWithDetail = ({
    showDetail
}) => {

    const mapSize = showDetail? 8 : 12
    const detailSize = showDetail? 4 : 0

    return (
        <MapContainer
            container
            spacing={0}
        >
            <Grid item xs={mapSize}>
                <LeafletMap />
            </Grid>
            { detailSize? <Grid item xs={detailSize}>
                <SummaryDetail />
            </Grid> : null}
        </MapContainer>
    )
}

const FieldMasterDetail = ({

}) => {
    return (
        <MasterDetail
        >
            <MasterList
                options={{
                    maxHeight: 570,
                }}
                addButton={
                    <BottomButton />
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
            <MapWithDetail
                showDetail={true}
            />
        </MasterDetail>
    )
}


const FieldRoutes = ({
    view
}) => {

    const ViewComponent = useMemo(() => {
        switch(view) {
            case VIEW_MAP:
                return FieldMasterDetail
            case VIEW_LIST:
                return FieldMasterDetail
            case VIEW_MODULE:
                return FieldMasterDetail
            default:
                return FieldMasterDetail
        }
    }, [view])
    
    return (
        <ViewComponent />
    )
}

const SummaryLayout = ({

}) => {

    const [currentView, setCurrentView] = useState(VIEW_MAP)

    return (
        <Container>
            <Table
            >
                <SummaryHeader 
                    
                />
                <FieldRoutes 
                    view={currentView}
                />
            </Table>        
        </Container>
    )
}

SummaryLayout.propTypes = {

}

export default SummaryLayout