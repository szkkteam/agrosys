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
        const { namespace, soils, listSoilTypes, ...rest } = this.props
        return (
            <Field name={namespace? `${namespace}.soilTypeId`: "soilTypeId"} {...rest}  component="select">
                { soils && soils.map((soilType, index) => (
                    <option key={index} value={soilType.id}>{soilType.title}</option>    
                )) }
            </Field>
        )
    }
}

const withReducer = injectReducer(require('soil/reducer'))
const withSaga = injectSagas(require('soil/saga'))

const withConnect = connect(
  (state) => ({ soils: selectSoilTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listSoilTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectSoil)

