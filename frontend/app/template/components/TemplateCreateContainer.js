import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createTemplate,
} from 'template/actions'

import {
    FormTemplate,
    TemplateLoadModal,
    FormTemplateLoad,
} from 'template/components'


class TemplateCreateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoadInitial: false,
            initialValues: {}
        }
    }

    onCancelModal = () => {
        // TODO: Clear initial state
        const { onCloseModal } = this.props
        onCloseModal && onCloseModal()
        this.setState({
            isLoadInitial: false,
        })
    }

    onLoadModal = () => {
        // TODO: Save initial state
        const { onCloseModal } = this.props
        onCloseModal && onCloseModal()
        this.setState({
            isLoadInitial: true,
        })
    }

    render() {
        const { 
            onCancel,
            isModalOpen,
            onCloseModal
        } = this.props

        return (
            <React.Fragment>
                <FormTemplate
                    onSubmit={createTemplate}
                    onCancel={onCancel}
                />
                <TemplateLoadModal
                    open={isModalOpen}
                    onClose={this.onCancelModal}
                >            
                    <FormTemplateLoad
                    />
                </TemplateLoadModal>
            </React.Fragment>
        )
    }
}


const withReducerTemplate = injectReducer(require('template/reducers/userTemplates'))
const withSagaCreate = injectSagas(require('template/sagas/createTemplate'))


export default compose(
    withReducerTemplate,
    withSagaCreate,
)(TemplateCreateContainer)