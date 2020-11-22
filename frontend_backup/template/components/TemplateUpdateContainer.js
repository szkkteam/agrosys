import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    updateTemplate,
} from 'template/actions'

import {
    FormTemplate,
    ViewTemplate
} from 'template/components'

class TemplateUpdateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isEdit : false,
        }
    }


    onClickEdit = () => {
        this.setState({
            isEdit: true
        })
    }

    onClickCancel = () => {
        this.setState({
            isEdit: false
        })
    }

    render() {
        const { initialValues } = this.props
        const { isEdit } = this.state

        return (
            <React.Fragment>
            {
                isEdit?
                    <FormTemplate
                        onSubmit={updateTemplate}
                        onSubmitSuccess={this.onClickCancel}
                        onCancel={this.onClickCancel}
                        initialValues={initialValues}
                    />
                :
                <ViewTemplate
                    initialValues={initialValues}
                    onEdit={this.onClickEdit}
                />
            }
            </React.Fragment>
        )
    }
}


const withReducerTemplate = injectReducer(require('template/reducers/userTemplates'))
const withSagaUpdate = injectSagas(require('template/sagas/updateTemplate'))


export default compose(
    withReducerTemplate,
    withSagaUpdate,
)(TemplateUpdateContainer)