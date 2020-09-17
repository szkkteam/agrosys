import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import reduxForm from 'redux-form/es/reduxForm'
import { FieldArray, formValueSelector } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'

import {
    CalendarField
} from 'template/components'

const FORM_NAME = 'formTemplate'


const renderTasks = ({fields, meta: { error, submitFailed}, ...rest}) => (
    <div>
    { fields.map((task, index) => (
        Object.keys(task).map((itemKey, i) => (
          <HiddenField 
            name={`${task}.${itemKey}`}                
            key={`${index}-${i}`}
          />  
        ))
    ))
    }
    </div>
  )
  

const FormTemplate = (props) => {
  const { 
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
      ...rest } = props

  console.log("tasks: ", tasks)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)

  return (      
    <form onSubmit={handleSubmit} >
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
                        label="Title of Template"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                    <FieldArray name="tasks" component={renderTasks}/>
                </Grid>
                <Grid item xs={12}>
                    <CalendarField
                        tasks={tasks}
                        change={change}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                className="form-button-grp">
                <Grid item xs={6}>
                    <Button 
                        variant="contained"
                        color="primary" 
                        disabled={submitting}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit"
                        variant="contained"
                        color="primary" 
                        disabled={submitting }
                    >
                    {submitting ? 'Saving...' : 'Save'}
                    </Button>
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
                ...locinitialValues
            },
            ...rest
        }
    },
)

const selector = formValueSelector(FORM_NAME)

const withSelectTasks = connect(
    (state, props) => {
        const tasks = selector(state, 'tasks')
        return {
            tasks
        }
    }
)

export default compose(
    withConnect,
    withForm,
    withSelectTasks,
    //withSagas,
)(FormTemplate) 

