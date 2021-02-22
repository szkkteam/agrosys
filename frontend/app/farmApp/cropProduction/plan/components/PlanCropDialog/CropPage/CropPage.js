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

import { CropSelect } from 'farmApp/cropProduction/crop/components'

import StepperNext from '../StepperNext'

import schema from './schema'

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const NextButton = styled(PrimaryButton)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    //transform: translateX(-50%);
`


const PlanCropSection = ({
    ...props
}) => {
    const [secondaryCrop, setSecondaryCrop] = useState(_.get(props.values, "secondaryCrop.cropType") == ""? false : true)

    const handleChange = (event) => {
        const value = event.target.checked
        if (!value) props.setFieldValue("secondaryCrop.cropType", "")
        setSecondaryCrop(value)
    }

    return (
        <Grid container spacing={4}>
            <Grid container item xs={12} justify="center">
                <Grid item xs={6}>
                    <Typography variant="body2" component="p">
                        Select what would you like to grow
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
                <Grid item xs={6}>
                    <CropSelect name="mainCrop.cropType"
                        label="Select main crop"
                    />
                </Grid>            
            </Grid>
            <Grid container item xs={12} justify="center">
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Specify options</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={secondaryCrop} onChange={handleChange} name="secondaryCrop" />}
                                label="Secondary crop"
                            />
                        </FormGroup>
                    </FormControl>
                    {secondaryCrop && <CropSelect name="secondaryCrop.cropType"
                        label="Select secondary crop"
                    /> }
                </Grid>            
            </Grid>
        </Grid>                
    )
}


const CropPage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <PlanCropSection
                    {...props}
                />
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
    mainCrop: {
        cropType: ""
    },
    secondaryCrop: {
        cropType: ""
    }
}

CropPage.schema = schema

export default CropPage