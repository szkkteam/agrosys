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

import { selectCropBases } from 'crop/reducers/cropBase'
import { selectCropVariants } from 'crop/reducers/cropVariant'
import { selectCropCultivationTypes } from 'crop/reducers/cropCultivationType'
import { selectCropTemplates } from 'crop/reducers/cropTemplate'

class CropTemplateContainer extends React.Component {

    componentDidMount () {
        this.props.listCropBases.trigger()
        this.props.listCropVariants.trigger()
        this.props.listCropCultivationTypes.trigger()
        this.props.listCropTemplates.trigger()
    }

    render() {
        return (
            null
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
  connect((state) => ({ cropBases: selectCropBases(state) }),
          (dispatch) => bindRoutineCreators({ listCropBases }, dispatch), ),          
  connect((state) => ({ cropVariants: selectCropVariants(state) }),
          (dispatch) => bindRoutineCreators({ listCropVariants }, dispatch), ),                    
  connect((state) => ({ cropCultivationTypes: selectCropCultivationTypes(state) }),
          (dispatch) => bindRoutineCreators({ listCropCultivationTypes }, dispatch), ),  
  connect((state) => ({ cropTemplates: selectCropTemplates(state) }),
          (dispatch) => bindRoutineCreators({ listCropTemplates }, dispatch), ),
)(CropTemplateContainer)

