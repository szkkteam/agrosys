import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'

import { CropTemplateContainer } from 'crop/components'
import { 
    FormProduction,
    ProductionFieldAssigment
} from 'production/components'

class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        
    }

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }


    componentDidMount() {
        this.props.listFields && this.props.listFields.maybeTrigger()
      }


    onTemplateSelected = (value) => {
        console.log("Template: ", value)
    }

    onProductionSelected = (value) => {
        console.log("Template: ", value)
    }
                /*
                <FormProduction
                    handleSubmit={() => null}
                />
                */
    render() {
        const { fields } = this.props
        return (
            <div>
                <div>
                    <CropTemplateContainer
                        onTemplateSelected={this.onTemplateSelected}
                        onProductionSelected={this.onProductionSelected}
                    />
                </div>
                <div>
                    <ProductionFieldAssigment
                        fields={fields}
                    />
                </div>

            </div>
            
        )
    }
}


const withReducer = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))

const withConnect = connect(
  (state) => ({fields: selectFieldsList(state)}),
  (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductionCreateContainer)