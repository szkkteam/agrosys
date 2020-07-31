import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

//import { FieldListLayout } from 'production/components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { CropTemplateContainer } from 'crop/components'

export default class ProductionCreateContainer extends React.Component {

    render() {
        return (
            <CropTemplateContainer />
        )
    }
}