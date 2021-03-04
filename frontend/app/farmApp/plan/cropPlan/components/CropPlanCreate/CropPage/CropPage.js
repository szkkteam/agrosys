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
import { spacing } from '@material-ui/system';
import * as Yup from 'yup';

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

import { CropSelect } from 'farmApp/product/crop/components'

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
        <Section mt={3}>
            <Field
                name="title"
                component={TextField}
                variant="outlined"
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
        <Section mt={3}>
            <CropSelect name="cropType"
                variant="outlined"
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
        <Section mt={3}>
            <Field
                name="expectedYield"
                component={TextField}
                label="Yield"
                fullWidth
                variant="outlined"
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
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title="Provide information about the crop you want to grow"
                        subheader="Every detail will be considered in the application so please be accurate."
                    />
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
            <FormFooter
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