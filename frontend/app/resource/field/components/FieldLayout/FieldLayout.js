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
    SideSheet
} from 'components'

import { LeafletMap } from 'components/Map/components'

import {
    Grid,
    Drawer,
} from '@material-ui/core';

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
    FieldListItem,
    FieldSummaryStats
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

const detailWidth = 400

const MapContainer = styled.div`
    display: flex;
    height: 100%;
`
/*
const MapTransition = styled(({open: dummy = null, ...props}) => <LeafletMap {...props} />)`
    ${({ theme, open }) => `
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    ${open? `width: calc(100% - ${detailWidth}px);`: `width: 100%;`}
    ${open? `margin-right: ${detailWidth}px;`: ``}
    //height: 100%;
    `}
`
*/

const MapTransition = styled(({open: dummy = null, ...props}) => <div {...props} />)`
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    display: flex;
    width: 100%;
    ${({ theme, open }) => open === true
    ? `
        //display: flex;
        //transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        width: calc(100% - ${detailWidth}px);
        //margin-right: ${detailWidth}px;
    `
    : `
        //transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;        
        //display: flex;
        //width: 100%;
    `
    }
`

const DrawerTransition = styled(Drawer)`
    ${({ theme, open }) => `
    width: ${open? `${detailWidth}px`: `0px`};
    flex-shrink: 0;

    .MuiPaper-root {
        width: ${detailWidth}px;
        top: initial;
    }
    `}
`


const FieldMapContainer = ({
    showDetail
}) => {

    const mapSize = showDetail? 8 : 12
    const detailSize = showDetail? 4 : 0

    return (
        <MapContainer>
            <MapTransition
                open={showDetail}
            >
                <LeafletMap />
            </MapTransition>
            <DrawerTransition
                variant="persistent"
                anchor="right"
                open={showDetail}
            >
                Detail
            </DrawerTransition>
        </MapContainer>
    )
}
const FieldMasterDetail = ({

}) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (data) => {
        setSelected(!!selected? null : data)
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
            <SideSheet
                open={!!selected}
            >
                <LeafletMap />
                <div>Detail</div>
            </SideSheet>
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

const FieldLayout = ({

}) => {

    const [currentView, setCurrentView] = useState(VIEW_MAP)

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
                            <FieldViews
                                view={currentView}
                                handleChange={setCurrentView}
                            />                      
                        </FlexGrid>
                    </Grid>
                </TableHeader>
                <FieldRoutes 
                    view={currentView}
                />
            </Table>        
        </Container>
    )
}

FieldLayout.propTypes = {

}

export default FieldLayout