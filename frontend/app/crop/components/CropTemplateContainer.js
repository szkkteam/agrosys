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
import { selectCropTemplatesList } from 'crop/reducers/cropTemplate'

import { SelectCrop } from 'crop/components'


class CropTemplateContainer extends React.Component {

    static defaultProps = {
        
      }

    constructor(props) {
        super(props)
        const { initialCropBaseId = null, initialCropVariantId = null, initialCropCultivationTypeId = null, initialProductionId = null } = props
        this.state = {
            selectedCropBaseId: initialCropBaseId,
            selectedCropVariantId: initialCropVariantId,
            selectedCropCultivationTypeId: initialCropCultivationTypeId,
            selectedProductionId: initialProductionId,
        }
    }

    componentDidMount = () => {
        const { selectedCropBaseId, selectedCropVariantId, selectedCropCultivationTypeId } = this.state
        this.props.listCropBases.trigger()
        if (selectedCropBaseId) this.props.listCropVariants.trigger({base: selectedCropBaseId})
        if (selectedCropVariantId) this.props.listCropCultivationTypes.trigger({base: selectedCropBaseId, variant: selectedCropVariantId})
        if (selectedCropCultivationTypeId) this.props.listCropTemplates.trigger({base: selectedCropBaseId, variant: selectedCropVariantId, cultivation_type: selectedCropCultivationTypeId})
    }

    componentDidUpdate = () => {
        const { cropTemplates, onTemplateSelected } = this.props
        Array.isArray(cropTemplates) && cropTemplates.length > 0 && onTemplateSelected && onTemplateSelected({
            cropTemplateId: cropTemplates[0].id,
            cropBaseId: this.state.selectedCropBaseId,
            cropVariantId: this.state.selectedCropVariantId,
            cropCultivationTypeId: this.state.selectedCropCultivationTypeId,
        })
    }

    onCropBaseSelected = (e) => {
        const { listCropVariants, onSelection } = this.props
        const value = e.target.value
        this.setState({
            selectedCropBaseId: value,
            selectedCropCultivationTypeId: null,
            selectedCropVariantId: null,
            selectedProductionId: null,
        })
        onSelection && onSelection()
        listCropVariants.trigger({base: value})
    }

    onCropVariantSelected = (e) => {
        const { listCropCultivationTypes, onSelection } = this.props
        const { selectedCropBaseId } = this.state
        const value = e.target.value
        this.setState({
            selectedCropVariantId: value,
            selectedCropCultivationTypeId: null,
            selectedProductionId: null,
        })
        onSelection && onSelection()
        listCropCultivationTypes.trigger({base: selectedCropBaseId, variant: value})
    }

    onCropCultivationTypeSelected = (e) => {
        const { listCropTemplates, onSelection } = this.props
        const { selectedCropBaseId, selectedCropVariantId } = this.state
        const value = e.target.value
        this.setState({
            selectedCropCultivationTypeId: value,
            selectedProductionId: null,
        })
        onSelection && onSelection()
        this.props.listCropTemplates.trigger({base: selectedCropBaseId, variant: selectedCropVariantId, cultivation_type: value})
    }
  
    onProductionSelected = (e) => {        
        const { onProductionSelected } = this.props
        const value = e.target.value
        this.setState({
            selectedProductionId: value
        })        
        onProductionSelected && onProductionSelected(value)
    }

    render() {
        const { cropBases, cropVariants, cropCultivationTypes, cropTemplates, onNewAdd } = this.props
        const { 
            selectedCropBaseId,
            selectedCropVariantId,
            selectedCropCultivationTypeId,
            selectedProductionId
        } = this.state
        const productions = Array.isArray(cropTemplates) && cropTemplates.length > 0? cropTemplates[0].productionTemplates : []
        return (
            <SelectCrop
                crops={cropBases}
                variants={cropVariants}
                cultivationTypes={cropCultivationTypes}
                templates={cropTemplates}
                productions={productions}
                selectedCropId={selectedCropBaseId}
                selectedVariantId={selectedCropVariantId}
                selectedCultivationTypeId={selectedCropCultivationTypeId}
                selectedProductionId={selectedProductionId}

                onClick={onNewAdd}
                onCropSelected={this.onCropBaseSelected}
                onVariantSelected={this.onCropVariantSelected}
                onCultivationTypeSelected={this.onCropCultivationTypeSelected}
                onProductionSelected={this.onProductionSelected}
            />            
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
  connect((state) => ({ cropTemplates: selectCropTemplatesList(state) }),
          (dispatch) => bindRoutineCreators({ listCropTemplates }, dispatch), ),
)(CropTemplateContainer)

