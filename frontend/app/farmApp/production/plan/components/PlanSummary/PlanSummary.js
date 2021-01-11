import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { PLAN_PRODUCTION_CREATE_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import { TableBase } from 'components/Table'
import { SplitButton } from 'components/Button'
import { 
    HiddenField,
    TextComponent,
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import {
    Button,
    Grid,
    Typography
} from '@material-ui/core'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const TableContainer = styled.div`
    //width: 50%;
`

const PlanSummaryTable = ({

}) => {

    const columns = [
        {title: 'Crop', field: 'crop',},
        {title: 'Planned yield', field: 'yield'},        
        {title: 'Type', field: 'type'},
        {title: 'Period', field: 'period'},
        {title: 'Fields size', field: 'size'},
        {title: 'Number of tasks', field: 'tasks'},
    ]

    const data = [
        {id: 1, crop: 'Winter wheat', yield: '5t', type: 'Main crop', period: '2020 july 5 - 2020 november 30', size: '35 ha', tasks: 24},
    ]
    return (
        <TableBase
            title="Productions in this season"
            columns={columns}
            data={data}
            options={{
                emptyRowsWhenPaging: true,
                paging: false, // By default remove paging
            }}
            components={{
                Container: (props) => <TableContainer {...props}/>,
            }}
        />
    )
}

/**
 * TODO: 
 * 1) We need a page title to explain whats going on
 * 2) We need a few field to setup the global params.
 * 3) We need a list component where the user can add sub productions
 * 4) We need a submit/save button
 */

const PlanSummary = ({

}) => {


    const data = [
        {id: 1}
    ]

    const push = usePushModalWindow()

    const openProductionCreation = () => {
        push(PLAN_PRODUCTION_CREATE_DIALOG, {}).then((status) => {
            console.debug("Finished: ", status)
        })
    }
    /*
    useEffect(() => {
        openProductionCreation()
    }, [])
    */

    const addButtonOptions = [
        { title: messages.addMainCrop, onClick: openProductionCreation},
        { title: messages.addSecondaryCrop, disabled: true, onClick: () => console.debug("Secondary click") }
    ]
    
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Create a new season
                    </Typography>
                </Grid>
                <Grid container item xs={12}>
                    <Grid container item xs={4} spacing={3}>
                        <Grid item xs={12}>
                            <TextComponent name="cropType"
                                label="Season name"
                                variant="outlined"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>    
                        <Grid item xs={12}>
                            <TextComponent name="cropType"
                                label="Season start year"
                                variant="outlined"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>    
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <PlanSummaryTable                
                    />
                    <SplitButton 
                        options={addButtonOptions}
                    />
                </Grid>


            </Grid>
        </Container>
    )
}

PlanSummary.propTypes = {

}

export default PlanSummary