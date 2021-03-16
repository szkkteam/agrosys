import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import globalMessages from 'messages'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Formik, Field } from "formik";

import { 
    Checkbox,
} from 'components/FormB'

import {
    Grid,
    FormControl,
    FormLabel,
    FormGroup,
} from '@material-ui/core'

import schema from './schema'

const FlexForm = styled(FormControl)`
    width: 100%;
`

const TemplateFeatureSection = ({
    name="",
    onChange,
}) => {
    const intl = useIntl()

    return (
        <FlexForm component="fieldset">
            <FormLabel component="legend">
                <FormattedMessage {...messages.title} />
            </FormLabel>
            <FormGroup>
                <Field name={`${name}.chemicalFertilizer`}
                    component={Checkbox}
                    //onChange={onChange}
                    label={intl.formatMessage(messages.fertalizer)}
                />
                <Field name={`${name}.chemicalSpraying`}
                    component={Checkbox}
                    //onChange={onChange}
                    label={intl.formatMessage(messages.chemicalTreatment)}
                />
            </FormGroup>
        </FlexForm>
    )
}

TemplateFeatureSection.propTypes = {

}

TemplateFeatureSection.schema = schema

TemplateFeatureSection.initialValues = {
    chemicalFertilizer: false,
    chemicalSpraying: false,
}

export default TemplateFeatureSection