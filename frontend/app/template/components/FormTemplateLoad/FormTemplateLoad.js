import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { SearchSelectComponent } from 'components/Form'

import { 
    listUserTemplates,
    listDefaultTemplates,
} from 'template/actions'

import {
    getUserDefaultTemplatesGrouped,
} from 'template/selectors'

class FormTemplateLoad extends React.Component {

    componentDidMount() {
        const { listUserTemplates, listDefaultTemplates } = this.props
        listUserTemplates && listUserTemplates.maybeTrigger()
        listDefaultTemplates && listDefaultTemplates.maybeTrigger()
    }

    render() {
        const { templates, onChange } = this.props

        console.log("FormTemplateLoad-templates: ", templates)
        return (
            <SearchSelectComponent
                options={templates}
                formProps={{fullWidth: true}}
                label="Select a template to load"
                groupBy={(option) => option.groupBy}
                getOptionLabel={(option) => typeof(option) === 'object' ? option.title : option}
                renderOption={(option, inputValue ) => {
                    return (
                        <div>{option.title}</div>
                    )                    
                }}
                onChange={(e, v) => onChange && onChange(v)}
            />
        )
    }
}


const withSagaUserTemplates = injectSagas(require('template/sagas/listUserTemplates'))
const withSagaDefaultTemplates = injectSagas(require('template/sagas/listDefaultTemplates'))

const withReducerUserTemplates = injectReducer(require('template/reducers/userTemplates'))
const withReducerDefaultTemplates = injectReducer(require('template/reducers/defaultTemplates'))
const withReducerTasks = injectReducer(require('task/reducers/tasks'))


const mapStateToProps = (state) => (    
    {   templates: getUserDefaultTemplatesGrouped(state), }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listUserTemplates, listDefaultTemplates }, dispatch),
)


export default compose(
    withSagaUserTemplates,
    withSagaDefaultTemplates,
    withReducerUserTemplates,
    withReducerDefaultTemplates,
    withReducerTasks,
    withConnect,
)(FormTemplateLoad)