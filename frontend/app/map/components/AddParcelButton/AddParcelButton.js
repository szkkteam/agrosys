import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { selectParcelTypesList } from 'reference/reducers/parcelTypes'

import {
    SplitButton
} from 'components/Button'

import {
    parcelTypesEnum
} from 'reference/constants'


import {
    getAvailableTypes
} from 'reference/utils'


class AddParcelButton extends React.Component {


    componentDidMount() {
        this.props.listParcelTypes.maybeTrigger()
    }


    renderButtonSwitch = (data) => {
        let retval = {
            type: "item",
            data: data,
            disabled: false,
            code: data.code,           
        }
        switch(data.code) {
            case parcelTypesEnum.AGRICULTURAL_PARCEL: // Agricultural Parcel
                return Object.assign(retval, {
                    title: "Add Agricultural Parcel",
                }) 
            case parcelTypesEnum.CADASTRAL_PARCEL: // Cadastral Parcel
                return Object.assign(retval, {
                    title: "Add Cadastral Parcel",
                }) 
            case parcelTypesEnum.FARMERS_BLOCK: // Farmer's Block
                return Object.assign(retval, {
                    title: "Add Farmer's Block",
                    key: "FARMERS_BLOCK",
                }) 
            case parcelTypesEnum.PHYSICAL_BLOCK: // Physical Block
                return Object.assign(retval, {
                    title: "Add Physical Block",
                }) 
            default:
                return {}
        }
    }

    render() {
        const { 
            parcelTypes,
            onParcelAdd,
            filterButtons,
         } = this.props

        const buttons = getAvailableTypes(parcelTypes, this.renderButtonSwitch, filterButtons).concat({ type: "divider" })
        return (
            <React.Fragment>
                <SplitButton 
                    options={buttons}
                    handleClick={onParcelAdd}
                />
            </React.Fragment>
        )
    }
}



const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const withConnect = connect(
  (state) => ({parcelTypes: selectParcelTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddParcelButton)