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
        //console.log("Form props: ", props)
        const { startDate, endDate } = props
        const selectedTaskType = selector(state, 'taskType')
        return { 
            initialValues: {
                startDate,
                endDate,
                taskType: 'TaskGeneral',
                status: 'Pending',
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

