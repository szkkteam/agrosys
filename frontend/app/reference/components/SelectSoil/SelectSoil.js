import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SelectField, SelectOption } from 'components/Form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSoilTypes } from 'reference/actions'
import { getSoilTypes } from 'reference/reducers/soilTypes'


class SelectSoil extends React.Component {
    componentDidMount () {
        this.props.listSoilTypes.maybeTrigger()
    }

    render() {
        const { soils, listSoilTypes, ...rest } = this.props       
        return (
            <SelectField
                //value={1}
                {...rest}
            >
            { soils && Array.isArray(soils) && soils.map((item, index) => (
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

const withReducer = injectReducer(require('reference/reducers/soilTypes'))
const withSaga = injectSagas(require('reference/sagas/listSoilsTypes'))

const mapStateToProps = state => (
    { soils: getSoilTypes(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listSoilTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectSoil)

