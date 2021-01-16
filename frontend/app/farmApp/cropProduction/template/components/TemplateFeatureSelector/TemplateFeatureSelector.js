import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import globalMessages from 'messages'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    BooleanComponent,
    BooleanField,
    TextComponent,
    SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import {
    Grid,
    FormControl,
    FormLabel,
    FormGroup,
} from '@material-ui/core'

const FlexForm = styled(FormControl)`
    width: 100%;
`

const TemplateFeatureSelector = ({
    name="",
    onChange,
}) => {

    return (
        <FlexForm component="fieldset">
            <FormLabel component="legend">
                Select features
            </FormLabel>
            <FormGroup>
                <BooleanField name={`${name}.chemicalFertilizer`}
                    onChange={onChange}
                    label="Műtrágya" 
                />
                <BooleanField name={`${name}.chemicalSpraying`}
                    onChange={onChange}
                    label="Vegyszeres kezelések" 
                />
            </FormGroup>
        </FlexForm>
    )
}

TemplateFeatureSelector.propTypes = {

}

export default TemplateFeatureSelector