import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'


import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    listCropBases,
    listCropVariants,
    listCropCultivationTypes,
    listCropTemplates
} from 'crop/actions'

import { selectCropBasesList } from 'crop/reducers/cropBase'
import { selectCropVariantsList } from 'crop/reducers/cropVariant'
import { selectCropCultivationTypesList } from 'crop/reducers/cropCultivationType'
import { selectCropTemplates } from 'crop/reducers/cropTemplate'

import { 
    SelectCrop,
} from 'crop/components'

class CropTemplateContainer extends React.Component {

    static defaultProps = {
        
      }

    constructor(props) {
        super(props)

        this.state = {
            selectedCropBaseId: null,
            selectedCropVariantId: null,
            selectedCropCultivationTypeId: null,
        }
    }

    componentDidMount () {
        this.props.listCropBases.trigger()
        
        this.props.listCropCultivationTypes.trigger()
        this.props.listCropTemplates.trigger()
    }


    componentWillReceiveProps(nextProps) {
        /*
        if (nextProps.field !== this.props.field) {
            this.setState({
                isAddNewDetail: false,
                enableDrawing: this.props.enableDrawing,
                featureInEdit: null,
            })
        }*/
    }

    onCropBaseSelected = (e) => {
        const value = e.target.value
        this.setState({
            selectedCropBaseId: value,
            selectedCropCultivationTypeId: null,
            selectedCropVariantId: null,
        })
        this.props.listCropVariants.trigger({base: value})
    }

    onCropVariantSelected = (e) => {
        const { selectedCropBaseId } = this.state
        const value = e.target.value
        this.setState({
            selectedCropVariantId: value,
            selectedCropCultivationTypeId: null,
        })
        this.props.listCropCultivationTypes.trigger({base: selectedCropBaseId, variant: value})
    }

    onCropCultivationTypeSelected = (e) => {
        const value = e.target.value
        this.setState({
            selectedCropCultivationTypeId: value
        })
    }

    render() {
        const { cropBases, cropVariants, cropCultivationTypes } = this.props
        const { selectedCropBaseId, selectedCropVariantId, selectedCropCultivationTypeId } = this.state
        console.log("selectedCropVariantId: ", selectedCropVariantId)
        return (
            <div>
                <SelectCrop 
                    id="crop-base-selector"
                    label="Select a crop"
                    value={selectedCropBaseId? selectedCropBaseId : ""}
                    items={cropBases}
                    onChange={this.onCropBaseSelected}
                />
                <SelectCrop
                    disabled={ selectedCropBaseId && cropVariants.length? false: true }
                    id="crop-variant-selector"
                    label="Select a variant"
                    helper="Select a crop first"
                    value={selectedCropVariantId? selectedCropVariantId : ""}
                    items={cropVariants}
                    onChange={this.onCropVariantSelected}
                />
                <SelectCrop
                    disabled={ selectedCropVariantId && cropCultivationTypes.length? false: true }
                    id="crop-cultivationtype-selector"
                    label="Select a cultivation type"
                    helper="Select a crop variant first"
                    value={selectedCropCultivationTypeId? selectedCropCultivationTypeId : ""}
                    items={cropCultivationTypes}
                    onChange={this.onCropCultivationTypeSelected}
                />
            </div>
        )
    }
}

const withReducerCropBase = injectReducer(require('crop/reducers/cropBase'))
const withReducerCropVariant = injectReducer(require('crop/reducers/cropVariant'))
const withReducerCropCultivationType = injectReducer(require('crop/reducers/cropCultivationType'))
const withReducerCropTemplate = injectReducer(require('crop/reducers/cropTemplate'))

const withSagaCropBase = injectSagas(require('crop/sagas/cropBase'))
const withSagaCropVariant = injectSagas(require('crop/sagas/cropVariant'))
const withSagaCropCultivationType = injectSagas(require('crop/sagas/cropCultivationType'))
const withSagaCropTemplate = injectSagas(require('crop/sagas/cropTemplate'))

export default compose(
  withReducerCropBase,
  withReducerCropVariant,
  withReducerCropCultivationType,
  withReducerCropTemplate,

  withSagaCropBase,
  withSagaCropVariant,
  withSagaCropCultivationType,
  withSagaCropTemplate,
  connect((state) => ({ cropBases: selectCropBasesList(state) }),
          (dispatch) => bindRoutineCreators({ listCropBases }, dispatch), ),          
  connect((state) => ({ cropVariants: selectCropVariantsList(state) }),
          (dispatch) => bindRoutineCreators({ listCropVariants }, dispatch), ),                    
  connect((state) => ({ cropCultivationTypes: selectCropCultivationTypesList(state) }),
          (dispatch) => bindRoutineCreators({ listCropCultivationTypes }, dispatch), ),  
  connect((state) => ({ cropTemplates: selectCropTemplates(state) }),
          (dispatch) => bindRoutineCreators({ listCropTemplates }, dispatch), ),
)(CropTemplateContainer)

