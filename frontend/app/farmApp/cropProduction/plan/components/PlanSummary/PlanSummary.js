import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'

import { PRODUCTION_CREATE_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import { SplitButton } from 'components/Button'
import { 
    TextWithUnitField,
    TextField,
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import {
    Button,
    Grid,
    Typography,
    FormGroup,
    FormControl,
    FormLabel,
    InputAdornment
} from '@material-ui/core'

import {
    ProductionSummaryTable
} from 'farmApp/cropProduction/production/components'

import { PLAN_FORM_NAME } from '../../constants'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { PRODUCTION_TYPE } from 'farmApp/cropProduction/production/constants'


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const FullHeightTable = styled(props => <ProductionSummaryTable {...props} />)`

`

const FormControlContainer = styled(FormControl)`
    margin: 0 5px;
    padding: 20px 10px;
    width: 100%;

`

const StretchColumn = styled.div`
    flex: 1 1 auto;    
`

const withForm = reduxForm({
    form: PLAN_FORM_NAME,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    //forceUnregisterOnUnmount: true, 
})

const formSelector = formValueSelector(PLAN_FORM_NAME)

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        //console.debug("locinitialValues: ", locinitialValues)

        //const { parcels, template } = formSelector(state, 'parcels', 'template')
        const productions = formSelector(state, 'productions')
        return {        
            initialValues: {
                productions: [],                                
                ...locinitialValues
            },
            productions,
            ...rest
        }
    },
)

const currency = [
    {id: 1, title: 'EUR'},
    {id: 2, title: 'HUF'},
]

/**
 * TODO: 
 * 1) We need a page title to explain whats going on
 * 2) We need a few field to setup the global params.
 * 3) We need a list component where the user can add sub productions
 * 4) We need a submit/save button
 */

const PlanSummary = ({
    array,
    productions,
}) => {


    const data = [
        {id: 1}
    ]

    const push = usePushModalWindow()

    const initialValues = {
        cropId: 1,
        productionType: PRODUCTION_TYPE.mainCropProduction
    }

    const openProductionCreation = () => {
        push(PRODUCTION_CREATE_DIALOG, {initialValues}).then(({payload, status}) => {
            // Production submitted
            if (status === MODAL_TYPE_CONFIRM) {
                array.push('productions', payload)
            }
            //console.debug("Payload: ", payload)
            //console.debug("Finished: ", status)
        })
    }
    
    useEffect(() => {
        openProductionCreation()
    }, [])
    
    const editProduction = (data, index) => {
        console.debug("Production data: ", data)
        push(PRODUCTION_CREATE_DIALOG, {initialValues: data}).then(({payload, status}) => {
            // Production submitted
            if (status === MODAL_TYPE_CONFIRM) {
                array.splice('productions', index, 1, payload)
            }
        })
    }

    const deleteProduction = (data, index) => {
        array.remove('productions', index)
    }

    const hasMainCrop = productions? productions.find(x => x.productionType === PRODUCTION_TYPE.mainCropProduction): false

    const addButtonOptions = [
        { title: messages.addMainCrop, disabled: !!hasMainCrop, onClick: openProductionCreation},
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
                    <Grid container item xs={6} >
                        <Grid container item xs={8} >
                            <FormControlContainer component="fieldset">
                                <FormLabel component="legend">
                                    Season global parameters
                                </FormLabel>
                                <FormGroup>
                                    <TextField name="title"
                                        label="Season name"
                                        variant="outlined"
                                        formProps={{fullWidth: true}}
                                    />
                                </FormGroup>
                            </FormControlContainer>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        
                        <Grid container item xs={8} >
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container style={{flexGrow: 1}}>
                <Grid container item xs={12} direction="column">
                    <StretchColumn style={{display: "flex"}}>
                        <FullHeightTable     
                            onOpenProduction={editProduction}
                            onDeleteProduction={deleteProduction}
                        >
                            <SplitButton 
                                options={addButtonOptions}
                            />
                        </FullHeightTable>
                    </StretchColumn>
                    <StretchColumn>
                        Summary
                    </StretchColumn>
                </Grid>
            </Grid>
            <div>
                Buttons
            </div>
        </Container>
    )
}

/*
TODO: This is not working properly
<FormControlContainer component="fieldset">
    <FormLabel component="legend">
        Bevétel
    </FormLabel>
    <FormGroup>
        <TextWithUnitField name="cropUnitPrice" unitName="currency"
            label="Eladási egységár"
            variant="outlined"
            defaultUnit={currency[1]}
            units={currency}
            formProps={{fullWidth: true}}
        />
    </FormGroup>
</FormControlContainer>

*/

PlanSummary.propTypes = {

}


const ConnectedPlanSummary = compose(
    withConnect,
    withForm,
)(PlanSummary) 


export default ConnectedPlanSummary