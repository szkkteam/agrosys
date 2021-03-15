import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SelectField, SelectOption } from 'components/Form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listAgriculturalTypes } from 'reference/actions'
import { getAgriculturalTypes } from 'reference/selectors'

class SelectAgriculturalType extends React.Component {

    componentDidMount () {
        this.props.listAgriculturalTypes.maybeTrigger()
    }

    render() {
        const { agriTypes, listAgriculturalTypes, ...rest } = this.props
        return (
            <SelectField
                //value={1}
                {...rest}
            >
                { agriTypes && Array.isArray(agriTypes) && agriTypes.map((item, index) => (
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

const withReducer = injectReducer(require('reference/reducers/agriculturalTypes'))
const withSaga = injectSagas(require('reference/sagas/listAgriculturalTypes'))

const mapStateToProps = state => (
    { agriTypes: getAgriculturalTypes(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listAgriculturalTypes }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectAgriculturalType)

