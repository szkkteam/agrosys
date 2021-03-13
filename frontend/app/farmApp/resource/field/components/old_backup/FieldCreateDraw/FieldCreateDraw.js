import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { syncValidator } from 'utils/validator'
import * as Yup from 'yup'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { pushModalWindow } from 'redux-promising-modals';
import { bindActionCreators } from 'redux'
import { goBack } from 'connected-react-router'

import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'

import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'

import { injectSagas } from 'utils/async'
import { createField } from '../../actions'

import { FIELD_FORM } from '../../constants'

import FieldDetailLayout from '../FieldDetailLayout/FieldDetailLayout'
import FieldCreateGridView from '../FieldCreateGridView/FieldCreateGridView'
import messages from './messages';
import { schema } from './schema'

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
`


const withForm = reduxForm({
    form: FIELD_FORM,
    validate: syncValidator(schema),
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const formSelector = formValueSelector(FIELD_FORM)

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        const fields = formSelector(state, 'fields')
        return {        
            initialValues: {
                ...locinitialValues
            },
            fields,
            ...rest
        }
    },
    (dispatch) => bindActionCreators({ pushModalWindow, goBack }, dispatch),
)


class FieldCreateDraw extends React.Component {

    componentDidMount() {
        const { startDraw = false } = this.props
        // If component is called within create context
        if (startDraw) {
            this.openFieldDraw(true)
        }
            
        
    }

    openFieldDraw = (exitOnCancel=false) => {
        const { pushModalWindow, array, goBack } = this.props

        pushModalWindow(FIELD_DRAW_DIALOG, {}).then(({payload, status}) => {

            if (status === MODAL_TYPE_CONFIRM) {
                //console.debug("Payload: ", payload)
                payload.map(field => array.push('fields', field))
                //array.push('productions', payload)
            } else {
                if (exitOnCancel) {
                    goBack()
                }
            }
        })
    }


    handleDeleteParcel = (index) => {
        this.props.array.remove('fields', index)
    }


    renderTable = (tableProps) => {
        const { fields } = this.props

        return <FieldCreateGridView 
                    fieldsData={fields}
                    onAddNew={this.openFieldDraw}
                    onDeleteItem={this.handleDeleteParcel}
                    {...tableProps}
                />
    }

    render() {

        const {
            handleSubmit,
            submitting,
            pristine
        } = this.props

        return (
            <Form onSubmit={handleSubmit(createField)}>  
                <FieldDetailLayout
                    title="Add your fields"
                    primaryButtonProps={{
                        type: "submit",
                        disabled: submitting || pristine
                    }}
                >
                    <FieldArray name="fields" component={this.renderTable} />                
                </FieldDetailLayout>  
            </Form>
        )
    }
}

const withSaga = injectSagas(require('../../sagas/createField'))

const ConnectedFieldCreateDraw = compose(
    withSaga,
    withConnect,
    withForm,
)(FieldCreateDraw) 

export default ConnectedFieldCreateDraw