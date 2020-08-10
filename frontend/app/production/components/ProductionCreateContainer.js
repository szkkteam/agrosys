import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'

import { CropTemplateContainer } from 'crop/components'
import { 
    FormProductionCreate,
    ProductionFieldAssigment,
    ProductionTaskContainer
} from 'production/components'

class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        
    }

    constructor(props) {
        super(props)

        this.state = {
            assignedFieldDetails: [],
            cropTemplateId: null,
        }
    }


    componentDidMount() {
        this.props.listFields && this.props.listFields.maybeTrigger()
      }


    onTemplateSelected = (value) => {
        console.log("Template: ", value)
        this.setState({
            cropTemplateId: value
        })
    }

    onProductionSelected = (value) => {
        console.log("Template: ", value)
    }

    onFieldClick = (fieldDetail) => {
        const { assignedFieldDetails } = this.state
        if (!assignedFieldDetails.find(e => e.id == fieldDetail.id)) {
            this.setState({
                assignedFieldDetails: [...this.state.assignedFieldDetails, fieldDetail]
            })           
        } else {
            this.setState({
                assignedFieldDetails: this.state.assignedFieldDetails.filter(e => e.id != fieldDetail.id)
            }) 
        }
    }
                /*
                <FormProduction
                    handleSubmit={() => null}
                />
                */
    render() {
        const { fields, routerParams } = this.props
        const { cropTemplateId, assignedFieldDetails } = this.state
        const { useAsTemplate } = routerParams
        console.log("Included fields: ", this.state.assignedFieldDetails)

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
                        onSelect={this.onFieldClick}
                    />
                </div>
                <div>
                    { cropTemplateId && 
                        <FormProductionCreate
                            useAsTemplate={useAsTemplate}
                            cropTemplateId={cropTemplateId}
                            fieldDetails={assignedFieldDetails}
                        /> 
                    }
                </div>
                <div>
                    <ProductionTaskContainer
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