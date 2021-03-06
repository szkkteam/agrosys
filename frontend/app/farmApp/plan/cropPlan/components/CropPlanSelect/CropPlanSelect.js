import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Formik, Field } from "formik";
import { TextField, Autocomplete } from 'components/FormB'
import * as Yup from 'yup';

const opntions = [
    {id: 1, title: "Őszi búza - 2020"},
    {id: 2, title: "Tavaszi búza - 2020"},
    {id: 1, title: "Repce (kísérleti)"},
]

const CropPlanSelect = ({
    name,
    label,
    ...props
}) => {

    const intl = useIntl()

    // TODO: Fetch crop plans for given season

    return (
        <Field 
            name={name}
            component={Autocomplete}
            formProps={{fullWidth: true}}
            //loading={false}
            disableClearable={true}
            options={opntions}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            inputParams={{
                label
            }}  
            {...props}              
        />            
    )
}


CropPlanSelect.propTypes = {

}

export default CropPlanSelect