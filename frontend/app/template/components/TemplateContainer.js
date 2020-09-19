import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    actionTemplate,
} from 'template/actions'

import {
    getUserSelectedTemplate
} from 'template/selectors'

import { selectTemplateState } from 'template/reducers/templates'

import {
    TemplateCreateContainer,
    TemplateUpdateContainer,
} from 'template/components'


import {
    createTemplateEnums
} from 'template/constants'


class TemplateContainer extends React.Component {

    onCancel = () => {        
        const { actionTemplate } = this.props
        console.log("actionTemplate: ", actionTemplate)
        actionTemplate && actionTemplate.selectState({
            templateState: createTemplateEnums.IDLE,
        })
    }

    onCloseModal = () => {
        const { actionTemplate } = this.props
        actionTemplate && actionTemplate.selectState({
            templateState: createTemplateEnums.CREATE_FROM_SCRATCH,
        })
    }

    render() {
        const { 
            templateState,
            selectedTemplate,
        } = this.props
        console.log("TemplateContainer-selectedTemplate: ", selectedTemplate)
        console.log("TemplateContainer-templateState: ", templateState)
        return (            
            <React.Fragment>
                { selectedTemplate?
                    <TemplateUpdateContainer
                        onCancel={this.onCancel}    
                        initialValues={selectedTemplate}
                    />                    
                :           
                    templateState !== createTemplateEnums.IDLE?
                        <TemplateCreateContainer
                            templateState={templateState}
                            onCancel={this.onCancel}
                            onCloseModal={this.onCloseModal}    
                        />
                    :
                    <div>This is the default view</div>
                }                
            </React.Fragment>
        )
    }
}


const withReducerUserTemplate = injectReducer(require('template/reducers/userTemplates'))
const withReducerTemplate = injectReducer(require('template/reducers/templates'))
const withSagaCreate = injectSagas(require('template/sagas/createTemplate'))
const withReducerTasks = injectReducer(require('task/reducers/tasks'))


const mapStateToProps = (state) => (    
    { selectedTemplate: getUserSelectedTemplate(state),
        templateState: selectTemplateState(state),
    }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ actionTemplate }, dispatch),
)


export default compose(
    withReducerUserTemplate,
    withReducerTemplate,
    withSagaCreate,
    withReducerTasks,
    withConnect
)(TemplateContainer)