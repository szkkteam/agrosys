import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createTemplate,
} from 'template/actions'

import {
    FormTemplate
} from 'template/components'

class TemplateCreateContainer extends React.Component {

    render() {
        const { onCancel } = this.props

        return (
            <FormTemplate
                onSubmit={createTemplate}
                onCancel={onCancel}
            />
        )
    }
}


const withReducerTemplate = injectReducer(require('template/reducers/templates'))
const withSagaCreate = injectSagas(require('template/sagas/createTemplate'))


export default compose(
    withReducerTemplate,
    withSagaCreate,
)(TemplateCreateContainer)