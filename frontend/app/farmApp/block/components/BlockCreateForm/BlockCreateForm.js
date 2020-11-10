import React, { useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import messages from './messages';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { Stepper } from 'components'

import { BLOCK_CREATE_FORM } from '../../constants'

//import FarmDataPage from './FarmDataPage'
//import EntitiesDataPage from './EntitiesDataPage'


const steps = [
    messages.step1Title,
    messages.step2Title,
]

const BlockCreateForm = ({
    pages,
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

    const contents = useMemo(() => pages.map((PageComponent, i) => {
        console.log("Index: ", i)
        console.log("pages.length: ", pages.length)
        console.log("Component: ", PageComponent)
        const isLast = i == pages.length - 1
        if (!isLast) {
            return ({onComplete, ...props}) => (
                <PageComponent
                    onSubmit={onComplete}
                    {...props}
                /> 
            )
        } else {
            return (props) => (
                <PageComponent
                    onSubmit={(e) => console.log("Submitting: ", e)}
                    {...props}
                />
            )
        }
    }))
    console.log("Contents: ", contents)
    /*
    const contents = [
        ({onComplete, ...props}) => (
            <div>
                First Page
            </div>
        ),
        (props) => (
            <div>
            Second Page
            </div>
        )
    ]*/

    return (      
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
                            stepsVisible={false}
                        />
                    </Grid>
                </Grid>
            </Grid>     
  ) 
}


const withForm = reduxForm({
    form: BLOCK_CREATE_FORM,
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
)(BlockCreateForm) 

