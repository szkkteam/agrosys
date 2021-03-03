import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field } from "formik";
//import { TextField } from 'formik-material-ui';
import { TextField } from 'components/FormB'
import * as Yup from 'yup';

import { 
    PrimaryButton
} from 'components'


import {
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    Typography
} from '@material-ui/core'

import { 
    TemplateSelect,
    TemplatePeriodSection,
    TemplateFeatureSection
} from 'farmApp/plan/template/components'

import StepperNext from '../StepperNext'

import schema from './schema'

const ColoredCheckBox = styled(Checkbox)`
    ${({theme, checked}) => `
        &.Mui-checked {
            color: ${theme.palette.success.main};
        }
    `}
`

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
`

const Section = styled(Grid)`
    padding-bottom: 45px;
`

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const TemplateSection = ({

}) => {
    return (
        <Section container item xs={12}>
            <Grid item xs={12} md={8} lg={6}>
                <SectionTitle>
                    <FormLabel component="legend">
                        How would you like to perform your work?
                    </FormLabel>
                </SectionTitle>
                <TemplateSelect name="template.type"
                    label="Operation template"
                />
            </Grid>
        </Section>
    )
}

const DateSection = ({
    values,
    ...props
}) => {
    return (
        <Section item xs={12}>
            <TemplatePeriodSection name="template.period"
            />
        </Section>
        
    )
}

const FeatureSection = ({
    values,
    ...props
}) => {
    return (
        <Section item xs={12}>
            <TemplateFeatureSection name="template.features"
                
            />
        </Section>
    )
}


const TemplatePage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <Grid container>
                    <Grid container item xs={12} sm={6} md={8}>
                        <TemplateSection
                            {...props}
                        />
                        <DateSection
                            {...props}
                        />
                        <FeatureSection
                            {...props}
                        />
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4}>
                        display
                    </Grid>
                </Grid>

            </InnerContainer>
            <StepperNext
                title={globalMessages.save}
            />
        </>     
    )
}

TemplatePage.propTypes = {

}


TemplatePage.initialValues = {
    template: {
        type: "",
        period: TemplatePeriodSection.initialValues,
        features: TemplateFeatureSection.initialValues
    }
}

TemplatePage.schema = schema

export default TemplatePage