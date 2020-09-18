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

import {
    TemplateCreateContainer,
    TemplateUpdateContainer,
} from 'template/components'


import {
    createTemplateEnums
} from 'template/constants'


class TemplateContainer extends React.Component {

    
    componentDidUpdate(prevProps) {    
        const { onCancel, createState, actionTemplate } = this.props
        if (prevProps.selectedTemplate !== this.props.selectedTemplate && this.props.selectedTemplate) {
            onCancel && onCancel()
        }        
        if (prevProps.createState === createTemplateEnums.IDLE && prevProps.createState !== createState ) {
            actionTemplate && actionTemplate.selectTemplate({
                selectedTemplateId: null
            })  
        }
        console.log("componentDidUpdate")
    }

    onCancel = () => {
        const { actionTemplate, onCancel } = this.props
        actionTemplate && actionTemplate.selectTemplate({
            selectedTemplateId: null
        })
        onCancel && onCancel()
    }

    render() {
        const { 
            createState,
            selectedTemplate,
            onCloseModal
        } = this.props
        console.log("TemplateContainer-selectedTemplate: ", selectedTemplate)
        console.log("TemplateContainer-createState: ", createState)
        return (            
            <React.Fragment>
                { selectedTemplate?
                    <TemplateUpdateContainer
                        onCancel={this.onCancel}    
                        initialValues={selectedTemplate}
                    />                    
                :
                    createState !== createTemplateEnums.IDLE?                   
                        <TemplateCreateContainer
                            onCancel={this.onCancel}
                            onCloseModal={onCloseModal}    
                            isModalOpen={createState === createTemplateEnums.CREATE_FROM_TEMPLATE}
                        />
                    : <div>Nothing to display yet.</div>
                }                
            </React.Fragment>
        )
    }
}


const withReducerTemplate = injectReducer(require('template/reducers/userTemplates'))
const withSagaCreate = injectSagas(require('template/sagas/createTemplate'))
const withReducerTasks = injectReducer(require('task/reducers/tasks'))


const mapStateToProps = (state) => (    
    { selectedTemplate: getUserSelectedTemplate(state), }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ actionTemplate }, dispatch),
)


export default compose(
    withReducerTemplate,
    withSagaCreate,
    withReducerTasks,
    withConnect
)(TemplateContainer)