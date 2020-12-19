import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import messages from './messages';
import { useIntl } from 'react-intl'
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';

import { Field, reduxForm } from 'redux-form'


import { FARM_PICK_ON_MAP_DIALOG } from 'site/modalTypes'
import { pushModalWindow } from 'redux-promising-modals';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { FARM_CREATE_FORM } from '../../constants'

import './farmcreate.scss'

const FarmDataPage = ({
    pushModalWindow,
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onComplete,
    ...rest 
}) => {

    const intl = useIntl()
    //{intl.formatMessage(messages.farmDashboardTitle)}

    const handlePickOnMap = () => {
        const { MODAL_TYPE_CONFIRM } = modalResultTypes
        pushModalWindow(FARM_PICK_ON_MAP_DIALOG, { title: 'Pick on map'}).then(({ status, payload}) => {
            if (status == MODAL_TYPE_CONFIRM) {
                console.log("Modal exited. payload: ", payload)
                change('address', payload.data)
            }            
        })
    }


    return (      
        <form onSubmit={handleSubmit} >
            <div className="form-container">
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField name="title"
                                label="Farm title"
                                variant="outlined"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField name="address"
                                label="Farm address"
                                variant="outlined"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={handlePickOnMap}
                                variant="contained"
                                color="primary"

                            >
                                <MapIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="currency"
                                label="Farm base currency"
                                variant="outlined"
                                formProps={{fullWidth: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitButton
                                cancelTitle={ButtonMessages.cancel}
                                submitTitle={ButtonMessages.next}
                                cancelDisabled={true}
                                submitDisabled={pristine || invalid}
                                onCancel={onBack}
                            />      
                        </Grid>
                    </Grid>
        
                </Grid>     
            </div>
        </form>
    ) 
}


const withForm = reduxForm({
    form: FARM_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
)


const withModal = connect(
    null,
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
  )

export default compose(
    withConnect,
    withForm,
    withModal,
)(FarmDataPage) 

