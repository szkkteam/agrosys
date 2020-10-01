import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    actionTemplate,
} from 'template/actions'

import {
    AddTemplateButton,    
} from 'template/components'

const TemplateCreateButtonContainer = ({
    actionTemplate,
}) => {

    const onSelect = (e, i) => {
        actionTemplate && actionTemplate.selectState({
            templateState: i.key,
        })
    }

    return (
        <div style={{marginBottom: "75px"}}>
            <AddTemplateButton
                onClick={onSelect}
            />
        </div>
    )
}

const withReducer = injectReducer(require('template/reducers/templates'))


const withConnect = connect(
    null,
    (dispatch) => bindRoutineCreators({ actionTemplate }, dispatch),
)


export default compose(
    withReducer,
    withConnect
)(TemplateCreateButtonContainer)