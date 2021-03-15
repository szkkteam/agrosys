import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field } from "formik";
//import { TextField } from 'formik-material-ui';
import { TextField, Autocomplete } from 'components/FormB'
import * as Yup from 'yup';

import {
    Grid
} from '@material-ui/core'

import StepperNext from '../StepperNext'

import { 
    //TemplateSummaryList,
    TemplatePeriodSection,
    TemplateFeatureSection
} from 'farmApp/cropProduction/template/form'

import schema from './schema'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 45px;
`

const TaskContainer = styled.div`
    flex-grow: 1;
`


const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'},
    {id: 2, title: 'Téli búza, No till'}
]

const mergedSchema = () => schema.concat(TemplatePeriodSection.schema)

const PlanCropTaskSection = ({

}) => {

    return (
        <Grid container spacing={4}>
            <Grid container item xs={12} spacing={3}>
                <Grid container item xs={6} spacing={3}>
                    <Grid item xs={10}>
                        <Field 
                            name="template"
                            component={Autocomplete}
                            formProps={{fullWidth: true}}
                            disableClearable={true}
                            options={templates}
                            groupBy={(option) => option.category}
                            getOptionLabel={(option) => option.title}
                            inputParams={{
                                label: "Select template"
                            }}                
                        /> 
                    </Grid>
                    <Grid container item xs={10}>
                        <TemplatePeriodSection 
                            name="period"
                        />
                    </Grid>                  
                </Grid>
                <Grid container item xs={6}>
                    <TemplateFeatureSection name="features"
                    />
                </Grid>
            </Grid>                
        </Grid>
    )
}


const TaskPage = ({

}) => {

    return (
        <>
            <Container>
                <PlanCropTaskSection />
                <TaskContainer>
                    Summary
                </TaskContainer>
            </Container>
            <StepperNext
                title={globalMessages.next}
            />
        </>                
    )
}
/*
<TemplateSummaryList />

<TemplateFeatureSelector name="template.configuration.features"
    onChange={handleFieldChange}
    features={template?.configuration?.features}
/>
*/

TaskPage.propTypes = {

}

TaskPage.initialValues = {
    period: TemplatePeriodSection.initialValues,
    features: TemplateFeatureSection.initialValues,
    template: "",
}

TaskPage.schema = mergedSchema()

export default TaskPage