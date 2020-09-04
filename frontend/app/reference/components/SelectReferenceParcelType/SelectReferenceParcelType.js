import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SelectField, SelectOption } from 'components/Form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { getReferenceParcelTypes } from 'reference/reducers/parcelTypes'

class SelectReferenceParcelType extends React.Component {

    componentDidMount () {
        this.props.listParcelTypes.maybeTrigger()
    }

    render() {
        const { parcels, listParcelTypes, ...rest } = this.props
        return (
            <SelectField
                //value={1}
                {...rest}
            >
                { parcels && Array.isArray(parcels) && parcels.map((item, index) => (
                    <SelectOption  
                        key={index} 
                        value={item.id}
                    >
                        {item.title}
                    </SelectOption >    
                ))}
            </SelectField>
        )
    }
}

const withReducer = injectReducer(require('reference/reducers/parcelTypes'))
const withSaga = injectSagas(require('reference/sagas/listParcelTypes'))

const mapStateToProps = state => (
    { parcels: getReferenceParcelTypes(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectReferenceParcelType)

