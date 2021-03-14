import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    listUserTemplates,
    actionTemplate,
} from 'template/actions'

import {
    getUserTemplatesDenormalized,
    getUserSelectedTemplate,
} from 'template/selectors'

import {
    TemplateList,
} from 'template/components'

class TemplateListContainer extends React.Component {

    
    componentDidMount() {
        const { listUserTemplates } = this.props
        listUserTemplates && listUserTemplates.maybeTrigger()
    }

    onSelect = (e, row) => {
        const { actionTemplate } = this.props
        actionTemplate && actionTemplate.selectTemplate({
            selectedTemplateId: row.id
        })
    }
 
    render() { 
        const { templates, selectedTemplate } = this.props
        // Keep this log, because parcelTree is not updated at the first time
        return (
            <React.Fragment>
                { templates && templates.length && 
                <TemplateList
                    title="Templates"   
                    templates={templates}
                    onRowClick={(e, d) => console.log("Event: ", e + " data: ", d)}
                    onRowClick={this.onSelect}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (selectedTemplate && selectedTemplate.id === rowData.id) ? '#EEE' : '#FFF'
                        })
                    }}
                    components={{
                        Toolbar: props => null,
                    }}
                /> 
                // TODO: Render some loading animation here
                }
                
            </React.Fragment>
        )
    }
}

const withSagaTemplates = injectSagas(require('template/sagas/listUserTemplates'))

const withReducerTemplates = injectReducer(require('template/reducers/userTemplates'))
const withReducerTasks = injectReducer(require('task/reducers/tasks'))


const mapStateToProps = (state) => (    
    {   templates: getUserTemplatesDenormalized(state),
        selectedTemplate: getUserSelectedTemplate(state), }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listUserTemplates, actionTemplate }, dispatch),
)


export default compose(
    withSagaTemplates,
    withReducerTemplates,
    withReducerTasks,
    withConnect,
)(TemplateListContainer)