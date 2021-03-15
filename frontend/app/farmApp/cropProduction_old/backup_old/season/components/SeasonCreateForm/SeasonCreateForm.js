import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'
import { useInjectSaga } from 'utils/hooks'

import { FullscreenFormLayout } from 'farmApp/components'

import { SplitButton, PrimaryButton } from 'components/Button'
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

import { SEASON_FORM } from '../../constants'
import { useProductionCreateDialog } from '../../hooks'
import { createSeason } from '../../actions'
import { PRODUCTION_TYPE } from 'farmApp/cropProduction/production/constants'


const Form = styled.form`
    width: 100%;
    flex-grow: 1;
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
    form: SEASON_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    //forceUnregisterOnUnmount: true, 
})

const formSelector = formValueSelector(SEASON_FORM)

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

const SeasonCreateForm = ({
    array,
    productions,
    userCropId,
    handleSubmit,
    submitting,
    pristine,
}) => {
    useInjectSaga(require('../../sagas/createSeason'))

    const productionCreateDialog = useProductionCreateDialog((payload) => {
        array.push('productions', payload)
    })
    const productionEditDialog = useProductionCreateDialog((payload, status, index) => {
        array.splice('productions', index, 1, payload)
    })

    const createProduction = (initialValues) => () => {
        productionCreateDialog({initialValues, userCropId})
    }

    const editProduction = (data, index) => {
        productionEditDialog({initialValues: data, userCropId}, index)
    }

    const deleteProduction = (data, index) => {
        array.remove('productions', index)
    }

    const hasMainCrop = useMemo(() => 
        productions? productions.find(x => x.productionType === PRODUCTION_TYPE.mainCropProduction): false
        , [productions]
    )

    const addButtonOptions = [
        { 
            title: messages.addMainCrop,
            disabled: !!hasMainCrop,
            onClick: createProduction({productionType: PRODUCTION_TYPE.mainCropProduction})
        },
        { 
            title: messages.addSecondaryCrop,
            disabled: true,
            onClick: () => console.debug("Secondary click") 
        }
    ]
    
    return (
        <FullscreenFormLayout
            headerProps={{
                title: "Create a new season",
                subheader: "Specifc the crop production parameters"
            }}
        >
            <Form onSubmit={handleSubmit(createSeason)}>
                <Grid container>                    
                    <Grid container item xs={12}>
                        <Grid container item xs={12} sm={6}>
                            <Grid container item xs={10} md={8}>
                                <FormControlContainer component="fieldset">
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
                        <Grid container item xs={12} sm={6}>
                            
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
                            {/* TODO: Display some summary information about the season */}
                        </StretchColumn>
                    </Grid>
                </Grid>
                <Grid container
                    justify="flex-end"
                >
                    <div>
                        <PrimaryButton 
                            disabled={submitting || pristine}
                            type="submit" 
                            title={globalMessages.submit}
                        />
                    </div>
                </Grid>
            </Form>
        </FullscreenFormLayout>
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

SeasonCreateForm.propTypes = {

}


const ConnectedSeasonCreateForm = compose(
    withConnect,
    withForm,
)(SeasonCreateForm) 


export default ConnectedSeasonCreateForm