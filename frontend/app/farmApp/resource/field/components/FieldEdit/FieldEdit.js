import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { pushModalWindow } from 'redux-promising-modals';
import { bindActionCreators } from 'redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'

import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

import { FIELD_SEASON_FORM } from '../../constants'

import {
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Grid
} from '@material-ui/core';

import FieldDetailLayout from '../FieldDetailLayout/FieldDetailLayout'
import FieldDetailPage from '../FieldDetailPage/FieldDetailPage'


const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
`

class FieldEdit extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const { startDraw = false } = this.props
        // If component is called within create context
        // FIXME: Modal is rendered twice because something if fucked up with the routers
        if (startDraw) {
            //this.openFieldDraw()
        }
            
        
    }

    openFieldDraw = () => {
        const { pushModalWindow } = this.props

        const initialValues = {

        }
        console.debug("Push modal")
        pushModalWindow(FIELD_DRAW_DIALOG, {initialValues}).then(({payload, status}) => {
            if (status === MODAL_TYPE_CONFIRM) {
                //array.push('productions', payload)
            }
        })
    }


    render() {
        const {
            handleSubmit,
            pristine,
            invalid,

            currentTitle,
            intl,
        } = this.props

        return (      
            <Form onSubmit={handleSubmit}>   
                <FieldDetailLayout>
                    <FieldDetailPage
                        onBorderEditClick={this.openFieldDraw}
                    >

                    </FieldDetailPage>
                </FieldDetailLayout>
            </Form>
        ) 
    }
}



const withForm = reduxForm({
    form: FIELD_SEASON_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
)


export default compose(
    withConnect,
    injectIntl,
    withForm
)(FieldEdit)
