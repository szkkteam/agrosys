import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { FieldListLayout } from 'field/components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selecFieldsList } from 'field/reducers/field'

class Fields extends React.Component {
   

    componentWillMount() {
        this.props.listFields && this.props.listFields.maybeTrigger()
      }

    render() {
        const { fields } = this.props
        return (
            <FieldListLayout 
                items={fields}
            />
        )
    }
} 


const withReducer = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))

const withConnect = connect(
  (state) => ({fields: selecFieldsList(state)}),
  (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Fields)