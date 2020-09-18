import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SearchSelectField, SelectOption, SelectOptionGrp } from 'components/Form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSpecificProducts } from 'reference/actions'
import { getSpecificProducts } from 'reference/selectors'

const specificProductsTmp = [
    {id: 1, title: "Tavaszi tönkölybúza", agriculturalProduct: 'Common wheat and spelt'},
    {id: 2, title: "Tavaszi novum búza", agriculturalProduct: 'Common wheat and spelt'},
    {id: 3, title: "Tavaszi durumbúza", agriculturalProduct: 'Durum wheat'},
]

class SelectSpecificProduct extends React.Component {

    componentDidMount () {
        this.props.listSpecificProducts.maybeTrigger()
        
    }

    render() {
        const { specificProducts, listSpecificProducts, ...rest } = this.props

        return (
            <SearchSelectField
                //value={1}
                {...rest}
                options={specificProductsTmp}
                groupBy={(option) => option.agriculturalProduct}
                getOptionLabel={(option) => typeof(option) === 'object' ? option.title : option}
                renderOption={(option, inputValue ) => {
                    console.log("Render option: ", option)
                    console.log("Render inputValue: ", inputValue)
                    return (
                        <div>{option.title}</div>
                    )                    
                  }}
                
                
            />
        )
    }
}

const withReducer = injectReducer(require('reference/reducers/specificProducts'))
const withSaga = injectSagas(require('reference/sagas/listSpecificProducts'))

const mapStateToProps = state => (
    { specificProducts: getSpecificProducts(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ listSpecificProducts }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectSpecificProduct)

