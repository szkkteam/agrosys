import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

//import { FieldListLayout } from 'production/components'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { CropTemplateContainer } from 'crop/components'
import { 
    FormProduction,
} from 'production/components'

export default class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        
    }

    constructor(props) {
        super(props)

        this.state = {
            
        }
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
        return (
            <div>
                <CropTemplateContainer
                    onTemplateSelected={this.onTemplateSelected}
                    onProductionSelected={this.onProductionSelected}
                />

            </div>
            
        )
    }
}