import React, { useContext, useMemo, useEffect } from 'react'
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

const Section = styled.div`
    ${spacing}
`


const CropPage = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <>          
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title={messages.stepCropTitle}
                        subheader={messages.stepCropSubheader}
                    />
                    <Section mt={3}>
                        <Field
                            name="title"
                            component={TextField}
                            variant="outlined"
                            label={intl.formatMessage(messages.cropfieldTitle)}
                            fullWidth
                        />
                    </Section>
                    <Section mt={3}>
                        <CropSelect name="cropType"
                            variant="outlined"
                            label={intl.formatMessage(messages.cropfieldCropType)}
                        />
                    </Section>
                    <Section mt={3}>
                        <Field
                            name="expectedYield"
                            component={TextField}
                            label={intl.formatMessage(messages.cropfieldYield)}
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                type: "number"
                            }}
                        />
                    </Section>
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