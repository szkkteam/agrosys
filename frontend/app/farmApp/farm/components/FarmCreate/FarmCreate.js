import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import messages from './messages';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { Stepper } from 'components'

import { FARM_CREATE_FORM } from '../../constants'

import FarmDataPage from './FarmDataPage'
import EntitiesDataPage from './EntitiesDataPage'

const steps = [
    messages.step1Title,
    messages.step2Title,
]



const FarmCreateForm = ({
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    resetSection,
    change,
    tasks,
    ...rest 
}) => {
    const contents = [
        ({onComplete, ...props}) => (
            <FarmDataPage
                onSubmit={onComplete}
                {...props}
            /> 
        ),
        (props) => (
            <EntitiesDataPage
                onSubmit={(e) => console.log("Submitting: ", e)}
                {...props}
            />
        )
    ]

    return (      
        <Container maxWidth="md">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stepper 
                            steps={steps}
                            contents={contents}
                        />
                    </Grid>
                </Grid>
            </Grid>     
        </Container>
  ) 
}


const withForm = reduxForm({
    form: FARM_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
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


export default compose(
    withConnect,
    withForm,
)(FarmCreateForm) 

