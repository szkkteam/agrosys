import React, { useContext, useMemo, useRef, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field, Form, FieldArray } from 'formik';
//import { TextField } from 'formik-material-ui';
import { TextField, Autocomplete } from 'components/FormB'
import { FieldArrayHelper } from 'components/Form'
import * as Yup from 'yup';

import {
    ExpandPanel,
    ExpandPanelGroup,
} from 'farmApp/components'

import {
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    Typography
} from '@material-ui/core'

import { CropSelect } from 'farmApp/cropProduction/crop/components'
import { 
    //TemplateSummaryList,
    TemplatePeriodSection,
    TemplateFeatureSection
} from 'farmApp/cropProduction/template/form'

import StepperNext from '../StepperNext'

import schema from './schema'

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const MaxWith = styled.div`
    max-width: 425px;
    width: 100%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`


const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'},
    {id: 2, title: 'Téli búza, No till'}
]

const MainCropSection = ({
    name,
    arrayValues,
    ...props
}) => {
    const cropTitle = arrayValues.cropType?.title ?? ""


    const handleCropChange = (event, value) => {
        props.setFieldValue(`${name}.template`, "")
    }

    return (
        <ExpandPanel
            {...props}
            summary={
                <Typography variant="body1">
                    <FormattedMessage 
                        {...messages.mainCropTitle} 
                            values={{
                                crop: cropTitle
                        }}
                    />
                </Typography>
            }
        >
            <Grid container spacing={6} style={{paddingBottom: "25px"}}>
                <Grid container item xs={12}>
                    <MaxWith>
                        <CropSelect name={`${name}.cropType`}
                            onChange={handleCropChange}
                            label="Select main crop"
                        />
                    </MaxWith>                    
                </Grid>
                <Grid container item xs={12} sm={6}>                    
                    <Grid container item xs={12} style={{paddingBottom: "35px"}}>
                        <MaxWith>
                            <Field 
                                name={`${name}.template`}
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
                        </MaxWith>
                    </Grid>
                    <Grid item xs={12}>
                        <TemplatePeriodSection 
                            name={`${name}.config.period`}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <Grid item xs={12}>
                        <TemplateFeatureSection 
                            name={`${name}.config.features`}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </ExpandPanel>
                  
    )
}


const CropAndTaskPage = ({
    values,
    ...props
}) => {
    const panelRef = useRef();
    const arrayRef = useRef();

    return (
        <>          
            <InnerContainer>
                <Typography variant="body2">Title</Typography>
                <FieldArray
                    name="growingSeasons"
                    render={arrayHelpers => (
                        <FieldArrayHelper
                            ref={arrayRef}
                            arrayHelpers={arrayHelpers}
                        >
                            <ExpandPanelGroup
                                ref={panelRef}
                                defaultOpen={0}
                            >
                                {values.cropPlan && values.cropPlan.map((plan, i) => {
                                    if (plan.cropPlanType === 'mainCropProduction')
                                        return (
                                            <MainCropSection
                                                name={`cropPlan[${i}]`}
                                                arrayValues={{...plan}}
                                                {...props}
                                            />
                                        )
                                    else
                                        return <div>not implemented</div>
                                })}
                            </ExpandPanelGroup>
                        </FieldArrayHelper>
                    )}
                />
                
            </InnerContainer>
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

CropAndTaskPage.propTypes = {

}


CropAndTaskPage.initialValues = {
    cropPlan: [
        {
            cropPlanType: 'mainCropProduction',
            cropType: "",
            template: "",
            config: {
                period: TemplatePeriodSection.initialValues,
                features: TemplateFeatureSection.initialValues,
            }
        }
    ],
    
}

CropAndTaskPage.schema = schema

export default CropAndTaskPage