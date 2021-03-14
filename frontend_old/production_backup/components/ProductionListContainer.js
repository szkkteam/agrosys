import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

//import { FieldListLayout } from 'production/components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listProductions } from 'production/actions'
import { selectProductions } from 'production/reducers/productions'

import { 
  ProductionListLayout,
} from 'production/components'

const FIELD_VIEW_TYPES = {
  GROUP_BY_PRODUCTION: {
      //Component: FieldListItemList,
  },
  GROUP_BY_FIELDS: {
      //Component: FieldListItemCard,
  } 
}


class ProductionListContainer extends React.Component 
{

      constructor(props) {
        super(props)

        this.state = {
            displayView : FIELD_VIEW_TYPES.GROUP_BY_PRODUCTION,
        }
    }

    componentDidMount() {
        this.props.listProductions && this.props.listProductions.maybeTrigger()
      }



    groupByFields = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.GROUP_BY_FIELDS })
    }

    groupByProductions = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.GROUP_BY_PRODUCTION })
    }


    render() {
        return (
            <ProductionListLayout />
        )
    }
}



const withReducer = injectReducer(require('production/reducers/productions'))
const withSaga = injectSagas(require('production/sagas/productions'))

const withConnect = connect(
  (state) => ({production: selectProductions(state)}),
  (dispatch) => bindRoutineCreators({ listProductions }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductionListContainer)