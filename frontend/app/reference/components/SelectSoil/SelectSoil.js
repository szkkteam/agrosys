import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSoilTypes } from 'reference/actions'
import { selectSoilTypesList } from 'reference/reducers/soilTypes'


class SelectSoil extends React.Component {
    componentDidMount () {
        this.props.listSoilTypes.maybeTrigger()
    }

    render() {
        const { soils, listSoilTypes, ...rest } = this.props
        return (
            <Field name="soilTypeId" {...rest}  component="select">
                { soils && soils.map((soilType, index) => (
                    <option key={index} value={soilType.id}>{soilType.title}</option>    
                )) }
            </Field>
        ) 
    }
}

const withReducer = injectReducer(require('reference/reducers/soilTypes'))
const withSaga = injectSagas(require('reference/sagas/listSoilsTypes'))

const withConnect = connect(
  (state) => ({ soils: selectSoilTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listSoilTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectSoil)

