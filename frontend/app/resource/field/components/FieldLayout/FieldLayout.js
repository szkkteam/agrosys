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
            <LeafletMap />
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
                    options={{
                        disableActions: true
                    }}
                    views={
                        <FieldViews
                            view={currentView}
                            handleChange={setCurrentView}
                        />
                    }
                />
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