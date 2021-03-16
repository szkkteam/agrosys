import React, { useContext, useMemo, useState } from 'react'
import messages from '../messages';
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

const Section = styled.div`
    ${spacing}
`

const TemplatePage = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <>          
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title={messages.stepTemplateTitle}
                        subheader={messages.stepTemplateSubheader}
                    />
                    <Section mt={3}>
                        <TemplateSelect name="template.type"
                            label={intl.formatMessage(messages.templateFieldTemplate)}
                            variant="outlined"
                        />
                    </Section>
                    <Section mt={3}>
                        <TemplatePeriodSection name="template.period"
                        />
                    </Section>
                    <Section mt={3}>
                        <TemplateFeatureSection name="template.features"
                            
                        />
                    </Section>
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