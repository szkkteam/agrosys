import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { formValueSelector } from 'redux-form';  // ES6


import { 
    FormTask,
} from 'production/components'

const FORM_NAME = 'create-task'

const selector = formValueSelector(FORM_NAME)

const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true, 
})

const withConnect = connect(
    (state, props) => {
        //console.log("Form task props: ", props) 
        const { initialValues = {} } = props        
        const { 
            taskType = 'TaskGeneral',
            status = 'Pending',
            ...rest,
        } = initialValues
        const selectedTaskType = selector(state, 'taskType')
        return { 
            initialValues: {
                taskType: taskType,
                status: status,
                ...rest,
            },
            selectedTaskType,

        }
    },
)


const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={props.action} {...props}/>
    )    
)

export default compose(
    withConnect,
    withForm,
    withAction,
)(FormTask) 

