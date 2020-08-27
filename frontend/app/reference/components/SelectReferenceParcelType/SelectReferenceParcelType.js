import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { selectParcelTypesList } from 'reference/reducers/parcelTypes'


class SelectReferenceParcelType extends React.Component {
    componentDidMount () {
        this.props.listParcelTypes.maybeTrigger()
    }

    render() {
        const { parcels, listParcelTypes, ...rest } = this.props
        return (
            <Field name="referenceParcelTypeId" {...rest}  component="select">
                { parcels && parcels.map((referenceParcelType, index) => (
                    <option key={index} value={referenceParcelType.id}>{referenceParcelType.title}</option>    
                )) }
            </Field>
        )
    }
}

const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const withConnect = connect(
  (state) => ({ parcels: selectParcelTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectReferenceParcelType)

