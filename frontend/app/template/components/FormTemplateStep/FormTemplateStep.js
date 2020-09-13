import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import reduxForm from 'redux-form/es/reduxForm'
import { HiddenField, TextField, onlyDecimal } from 'components/Form'

const FORM_NAME = 'formCreateTemplate'

const FormTemplateStep = ({
    handleSubmit,
    submitting,
    onClickBack,
    onClickNext 
}) => {
    return (
        <form onSubmit={handleSubmit} className="">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item xs={12}>
                    <TextField name="title"
                        label="Title of the new template"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <div>Placeholder for product selection</div>                        
                </Grid>
                <Grid
                    container
                    spacing={1}
                    className="form-button-grp">
                    <Grid item xs={6}>
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={onClickBack}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onClickNext}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>     
        </form>
    )
}

const withForm = reduxForm({
    form: FORM_NAME,
    forceUnregisterOnUnmount: true,
    destroyOnUnmount: false,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

//const withSagas = injectSagas(require('field/sagas/createFieldDetail'))

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return { 
            initialValues: {            
            },
            ...rest

        }
    },
)


export default compose(
    withConnect,
    withForm,
    //withSagas,
)(FormTemplateStep) 

