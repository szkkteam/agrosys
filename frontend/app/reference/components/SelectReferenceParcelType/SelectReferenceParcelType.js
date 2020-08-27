import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SelectField, SelectOption } from 'components/Form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { selectParcelTypesList } from 'reference/reducers/parcelTypes'

/**
 
 */

class SelectReferenceParcelType extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: 0,
        }
    }

    componentDidMount () {
        this.props.listParcelTypes.maybeTrigger()
    }

    render() {
        const { parcels, listParcelTypes, ...rest } = this.props
        const { value } = this.state
        console.log("Parcels: ", parcels)
        
        return (
            <SelectField
                name="referenceParcelTypeId"
                label="Select a parcel type"
                formProps={{fullWidth: true}}
                {...rest}
            >
                { parcels && Array.isArray(parcels) && parcels.map((item, index) => (
                    <SelectOption 
                        key={index} 
                        value={item.id}
                    >
                        {item.title}
                    </SelectOption>    
                ))}
            </SelectField>
        )
    }
}

const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const withConnect = connect(
  (state) => ({ parcels: selectParcelTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectReferenceParcelType)

