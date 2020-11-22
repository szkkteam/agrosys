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

import { convertToDateObject } from 'task/utils'


import {
    createTemplateEnums
} from 'template/constants'


class TemplateCreateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoadInitial: false,
            initialValues: {}
        }
    }

    onCancelModal = () => {
        const { onCloseModal } = this.props
        onCloseModal && onCloseModal()
        this.setState({
            isLoadInitial: false,
        })
    }

    onLoadModal = () => {
        const { onCloseModal } = this.props
        onCloseModal && onCloseModal()
        this.setState({
            isLoadInitial: true,
        })
    }
 
    storeLoadedData = ({title, tasks}) => {
        // TODO: Adjust every tasks to set the year to the current year by default.
        this.setState({
            initialValues: {
                title,
                tasks : convertToDateObject(tasks),
            },
        })
    }

    render() {
        const { 
            templateState,
            onCancel,
        } = this.props

        const { isLoadInitial, initialValues } = this.state
        return (
            <React.Fragment>
                <FormTemplate
                    onSubmit={createTemplate}
                    //onSubmitSuccess={onCancel}
                    onCancel={onCancel}
                    initialValues={isLoadInitial? initialValues : {}}
                />
                <TemplateLoadModal
                    open={templateState === createTemplateEnums.CREATE_FROM_TEMPLATE}
                    onClose={this.onCancelModal}
                    onLoad={this.onLoadModal}
                >            
                    <FormTemplateLoad
                        onChange={this.storeLoadedData}
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