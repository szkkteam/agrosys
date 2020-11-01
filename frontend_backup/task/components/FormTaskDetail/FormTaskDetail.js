import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import reduxForm from 'redux-form/es/reduxForm'
import { FieldArray, formValueSelector, FormSection } from 'redux-form'

import { HiddenField, TextField, TextArea , SelectField, SelectOption } from 'components/Form'

import { statusEnum, taskTypesEnum } from 'task/constants'

const FORM_NAME = 'formTask'


const renderItems = (items) => (
    items && Array.isArray(items) && items.map((item, index) => (
        <SelectOption 
            key={index} 
            value={item.id}
        >
            {item.title}
        </SelectOption>    
    ))
)


const FormTaskDetail = (props) => {

    const renderTaskType = (value) => {
        switch(value) {
            case 'TaskGeneral':
                return (
                    <div>
                        Display: {value} related fields
                    </div>
                )
            case 'TaskPruning':
                return (
                    <div>
                        Display: {value} related fields
                    </div>
                )
            default:
                return null
        }
    }

    const { 
        invalid,
        handleSubmit,
        onCancel,
        submitting,
        pristine,
        action,
        dirty,
        resetSection,
        selectedTaskType,
        canChangeTaskType = true,
        ...rest 
    } = props
    console.log("selectedTaskType: ", selectedTaskType)
    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField name="title"
                            label="Title of the task"
                            className="full-width"
                            autoFocus 
                        />      
                        <TextArea name="description"
                            label="Description"
                            className="full-width"
                        /> 
                        {canChangeTaskType && <SelectField name="taskType"
                            label="Task Type"
                            inputName="select-status"
                            formProps={{className:"full-width"}}
                        >
                            {renderItems(taskTypesEnum)}
                        </SelectField> }
                        <FormSection
                            name="dates"
                        >
                            <HiddenField name="startDate" />
                            <HiddenField name="endDate" />
                        </FormSection>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField name="status" 
                            label="Task status"
                            inputName="select-status"
                            formProps={{className:"full-width"}}
                        >
                            {renderItems(statusEnum)}
                        </SelectField>
                        <TextField name="predictedCost"
                            label="Planned Cost"
                            className="full-width"
                        />   
                    </Grid>        
                    <Grid item xs={12}>
                        {selectedTaskType && renderTaskType(selectedTaskType)}
                    </Grid>        
                </Grid>
            </Grid>        
        </form>
    )
}



const withForm = reduxForm({
    form: FORM_NAME,
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
                taskType: 'TaskGeneral',
                status: 'Pending',
                ...locinitialValues
            },      
            ...rest

        }
    },
)

const selector = formValueSelector(FORM_NAME)
const withSelectTaskType = connect(
    (state, props) => {
        const selectedTaskType = selector(state, 'taskType')
        return {
            selectedTaskType
        }
    }
)

export default compose(
    withConnect,
    withForm,
    withSelectTaskType,
    //withSagas,
)(FormTaskDetail) 

