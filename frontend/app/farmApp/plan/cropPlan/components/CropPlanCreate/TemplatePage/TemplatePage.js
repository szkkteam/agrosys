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
import { spacing } from '@material-ui/system';

import { 
    PageHeader
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

import FormFooter from '../FormFooter'

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
const Section = styled.div`
    ${spacing}
`

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const TemplateSection = ({

}) => {
    return (
        <Section mt={3}>
            <TemplateSelect name="template.type"
                label="Operation template"
                variant="outlined"
            />
        </Section>
    )
}

const DateSection = ({
    values,
    ...props
}) => {
    return (
        <Section mt={3}>
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
        <Section mt={3}>
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
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title="Select your task template"
                        subheader="Every detail will be considered in the application so please be accurate."
                    />
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
                
            </Grid>
            <FormFooter
                title={globalMessages.save}
            />
        </>     
    )
}
/*
<Grid container item xs={12} sm={6} md={4}>
                    display
                </Grid>
*/

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