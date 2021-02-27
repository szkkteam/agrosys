import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Formik, Field } from "formik";
import { TextField, Autocomplete } from 'components/FormB'
import * as Yup from 'yup';

import { useFetchCropTypes } from '../../hooks'

const CropSelect = ({
    name,
    label,
    ...props
}) => {

    const intl = useIntl()

    const {payload: cropTypes, isLoading } = useFetchCropTypes()

    return (
        <Field 
            name={name}
            component={Autocomplete}
            formProps={{fullWidth: true}}
            loading={isLoading}
            disableClearable={true}
            options={cropTypes}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            inputParams={{
                label
            }}  
            {...props}              
        />            
    )
}
/* TODO: Post request as array, not supported.
                    <Grid item xs={1}>
                        <IconButton>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
*/
/*
PlanCropTaskSection.initialValues = {
    period: TemplatePeriodSection.initialValues,
    template: "",
}
PlanCropSection.schema = schema
*/

CropSelect.propTypes = {

}

export default CropSelect