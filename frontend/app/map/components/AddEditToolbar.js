import React from 'react'
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { getReferenceParcelTypes } from 'reference/reducers/parcelTypes'

import {
    parcelTypesEnum
} from 'reference/constants'

import {
    AddParcelButton,
    EditParcelButton,
} from 'map/components'


import {
    getAvailableTypes
} from 'reference/utils'


class AddEditToolbar extends React.Component {


    componentDidMount() {
        this.props.listParcelTypes.maybeTrigger()
    }


    renderButtons = (data) => {
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

    filterButtons = (data) => {
        const { selectedParcel } = this.props
        return selectedParcel? (((selectedParcel.referenceParcelType.code != parcelTypesEnum.AGRICULTURAL_PARCEL) && 
        (data.code == parcelTypesEnum.AGRICULTURAL_PARCEL))? true : false) : true
    }


    render() {
        const {
            parcelTypes,
            onAdd,
            onEdit,
            selectedParcel
         } = this.props

        const mainButtons = getAvailableTypes(parcelTypes, this.renderButtons, this.filterButtons)
        const buttonsWithsearchExtension = mainButtons.concat({ type: "divider" })        
        return (
            <React.Fragment>
                    { mainButtons.length &&
                        <AddParcelButton       
                            buttons={buttonsWithsearchExtension}
                            onParcelAdd={onAdd}
                        />
                    }
                    { selectedParcel &&
                        <EditParcelButton
                            title={selectedParcel.title}
                            onEdit={onEdit}
                        />
                    }
            </React.Fragment>
                    
        )
    }
}
/*
<Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item xs={6}>
                    { mainButtons.length &&
                        <AddParcelButton       
                            buttons={buttonsWithsearchExtension}
                            onParcelAdd={onAdd}
                        />
                    }
                </Grid>
                <Grid item xs={6}>
                    { selectedParcel &&
                        <EditParcelButton
                            title={selectedParcel.title}
                            onEdit={onEdit}
                        />
                    }
                </Grid>
            </Grid>
*/

const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const mapStateToProps = state => (
    {parcelTypes: getReferenceParcelTypes(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddEditToolbar)