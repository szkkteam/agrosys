import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    listUserTemplates,
} from 'template/actions'

import {
    getUserTemplatesDenormalized,
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
        console.log("Row: ", row)
        /*
        const { actionParcel } = this.props
        actionParcel && actionParcel.selectParcel({
            selectedParcelId: row.id
        })
        */
    }
 
    render() { 
        const { templates, selectedTemplate } = this.props
        // Keep this log, because parcelTree is not updated at the first time
        console.log("TemplateListContainer-templates: ", templates)
        return (
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
        )
    }
}

const withSagaTemplates = injectSagas(require('template/sagas/listUserTemplates'))

const withReducerTemplates = injectReducer(require('template/reducers/userTemplates'))
const withReducerTasks = injectReducer(require('task/reducers/tasks'))


const mapStateToProps = (state) => (    
    {   templates: getUserTemplatesDenormalized(state),
        selectedTemplate: null, }
)


const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listUserTemplates }, dispatch),
)


export default compose(
    withSagaTemplates,
    withReducerTemplates,
    withReducerTasks,
    withConnect,
)(TemplateListContainer)