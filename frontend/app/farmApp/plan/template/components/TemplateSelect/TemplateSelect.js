import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Formik, Field } from "formik";
import { TextField, Autocomplete } from 'components/FormB'


const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'},
    {id: 2, title: 'Téli búza, No till'}
]

const TemplateSelect = ({
    name,
    label,
    ...props
}) => {

    const intl = useIntl()

    return (
        <Field 
            name={name}
            component={Autocomplete}
            formProps={{fullWidth: true}}
            //loading={isLoading}
            disableClearable={true}
            options={templates}
            //groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            inputParams={{
                label
            }}  
            {...props}              
        />            
    )
}


TemplateSelect.propTypes = {

}

export default TemplateSelect