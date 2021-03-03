import React, { useContext, useMemo, useEffect } from 'react'
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

import { CropSelect } from 'farmApp/product/crop/components'

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

const TitleSection = ({
    values,
    setFieldValue,
    ...props
}) => {
    /*
    const cropType = _.get(values, "cropType")
    const season = _.get(values, "season")
    const title = _.get(values, "title")

    useEffect(() => {
        if (title === "") {
            //setFieldValue('cropType', `${cropType} - ${season}`)
        }
    }, [cropType])
    */
    return (
        <Section item xs={12}>
            <SectionTitle>
                <FormLabel component="legend">
                    Name your crop plan
                </FormLabel>
            </SectionTitle>
            <Field
                name="title"
                component={TextField}
                label="Title"
                fullWidth
            />
        </Section>
    )
}

const CropSection = ({
    values,
    ...props
}) => {
    const isCropSelected = _.get(values, "cropType") !== ""

    return (
        <Section item xs={12}>
            <SectionTitle>
                <FormLabel component="legend">
                    What is the main crop you would like to grow?
                </FormLabel>
            </SectionTitle>
            <CropSelect name="cropType"
                label="Main crop type"
            />
        </Section>
        
    )
}

const YieldSection = ({
    values,
    ...props
}) => {
    return (
        <Section item xs={12}>
            <SectionTitle>
                <FormLabel component="legend">
                    What is the expected yield in t/ha?
                </FormLabel>
            </SectionTitle>
            <Field
                name="expectedYield"
                component={TextField}
                label="Yield"
                fullWidth
                inputProps={{
                    type: "number"
                }}
            />
        </Section>
    )
}


const CropPage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <Grid container>
                    <Grid container item xs={12} sm={8} md={4}>
                        <TitleSection
                            {...props}
                        />
                        <CropSection
                            {...props}
                        />
                        <YieldSection
                            {...props}
                        />
                    </Grid>
                </Grid>

            </InnerContainer>
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

CropPage.propTypes = {

}


CropPage.initialValues = {
    title: "",
    cropType: "",
    expectedYield: "",
}

CropPage.schema = schema

export default CropPage