import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { FIELD_SEASON_FORM } from '../../constants'

import FieldDetailPage from '../FieldDetailPage/FieldDetailPage'


const withForm = reduxForm({
    form: FIELD_SEASON_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
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
)


const FieldDetail = compose(
    withConnect,
    withForm,
)(FieldDetailPage) 

const FieldCreateDraw = ({
    ...props
}) => {
    /**
     * TODO:
     * - Open the field DetailPage with season specific parameters. This will use another API endpoint
     * - Based on input param: startEdit the DetailPage should automatically spawn the draw page.
     */
    
    return (
        <FieldDetail
            {...props}
            //TODO: saga promise, startDraw, etc

        />
    )
}

FieldCreateDraw.propTypes = {

}

export default FieldCreateDraw