import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

//import { FieldListLayout } from 'production/components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listProductions } from 'production/actions'
import { selectProductionsList } from 'production/reducers/productions'

class ProductionListContainer extends React.Component 
{

    componentWillMount() {
        this.props.listProductions && this.props.listProductions.maybeTrigger()
      }

    render() {
        return (
            <div>List</div>
        )
    }
}



const withReducer = injectReducer(require('production/reducers/productions'))
const withSaga = injectSagas(require('production/sagas/productions'))

const withConnect = connect(
  (state) => ({productions: selectProductionsList(state)}),
  (dispatch) => bindRoutineCreators({ listProductions }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductionListContainer)