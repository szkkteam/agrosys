import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listSoilTypes } from 'field/actions'
import { selectSoilTypesList } from 'field/reducers/soilTypes'
import { HiddenField, PasswordField, TextField } from 'components/Form'

import { SelectSoil } from 'soil/components'

/*
<Field name={`${namespace}.soilTypeId`} component="select">
                { soilTypes.map((soilType, index) => {
                    <option value={soilType.id}>{soilType.title}</option>    
                }) }
            </Field>
*/
/*
class SoilTypeSelect extends React.Component {
    componentWillMount () {
        this.props.listSoilTypes.maybeTrigger()
    }

    render() {
        const { namespace, soilTypes } = this.props
        return (
            <Field name={`${namespace}.soilTypeId`}  component="select">
                { soilTypes.map((soilType, index) => (
                    <option key={index} value={soilType.id}>{soilType.title}</option>    
                )) }
            </Field>
        )
    }
}

const withReducer = injectReducer(require('field/reducers/soilTypes'))
const withSaga = injectSagas(require('field/sagas/soilTypes'))

const withConnect = connect(
  (state) => ({ soilTypes: selectSoilTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listSoilTypes }, dispatch),
)

const WithSoilTypeSelect = compose(
  withReducer,
  withSaga,
  withConnect,
)(SoilTypeSelect)
*/

export const FieldDetailSection = ({ namespace, ...rest }) => (
    <div>
        <TextField name={`${namespace}.value`}
                    label="Field value"
                    className="full-width"
                    autoFocus />
        <TextField name={`${namespace}.area`} 
                    label="Field area in m2"
                    className="full-width"
                    autoFocus/>
        <HiddenField name={`${namespace}.shape`} />
        <SelectSoil
            namespace={namespace}
            {...rest}
        />
    </div>
)
