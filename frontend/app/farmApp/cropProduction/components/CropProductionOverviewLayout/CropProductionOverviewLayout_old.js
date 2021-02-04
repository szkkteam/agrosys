import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { HashRoute } from 'utils/route'
import { ROUTES } from 'routes'

import { CROP_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import { VIEW_MODULE, VIEW_LIST } from '../../constants'

import { 
    TableHeader,
} from 'components/Table'

import { 
    PrimaryActionButton,
    ViewButtonGroup
} from 'components'

import CropProductionModuleLayout from '../CropProductionModuleLayout/CropProductionModuleLayout'

import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ListIcon from '@material-ui/icons/List';

import {
    Grid,
} from '@material-ui/core'

const Container = styled.div`
    padding: 15px 20px;
    height: 100%;
    overflow: hidden;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const CropRoutes = ({
    height,
}) => {
    return (
        <>
            <HashRoute path={VIEW_MODULE} component={props => <CropProductionModuleLayout height={height} {...props} />} />
            <HashRoute path={VIEW_LIST} component={props => <CropProductionModuleLayout height={height} {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_MODULE}} />} />
        </>
    )
}


const CropProductionOverviewLayout = ({

}) => {

   const views = [
        {value: VIEW_MODULE, icon: ViewModuleIcon},
        {value: VIEW_LIST, icon: ListIcon},
    ]


    const push = usePushModalWindow()

    const openEdit = (e, data) => {
        push(CROP_DIALOG, {data}).then((status) => {
            console.debug("Finished: ", status)
        })
    }

    const handleAddNew = (e) => {
        push(CROP_DIALOG, {}).then((status) => {
            console.debug("Finished: ", status)
        })
    }

    //TODO: Remove
    /*
    useEffect(() => {
        handleAddNew()
    }, [])
    */

    return (
        <Container>
            <TableHeader
                title={messages.title}
            >   
                <Grid
                    container
                    justify="flex-end"
                >
                    <FlexGrid item xs={9}>
                        <Spacer />
                        <PrimaryActionButton
                            title={messages.addNewTitle}
                            onClick={handleAddNew}
                        />
                    </FlexGrid>
                    <FlexGrid item xs={3}>      
                        <Spacer />
                        <ViewButtonGroup
                            items={views}
                        />
                    </FlexGrid>
                </Grid>
            </TableHeader>
            <CropRoutes />
        </Container>
    )
}

/*
        <div>
        Crop overview. Show quick stats about crops and running productions.<br/>
        Add possibility to create crop, or create production directly under specifc crop or create inline crop for it.<br/>
        Also manage the seasons?<br/>
    </div>
*/

CropProductionOverviewLayout.propTypes = {

}

export default CropProductionOverviewLayout
