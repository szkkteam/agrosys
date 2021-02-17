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

import {
    Grid
} from '@material-ui/core'

import StepperNext from './StepperNext'

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const templates = [
    {id: 1, title: 'Téli búza, mulcsos művelés'},
    {id: 2, title: 'Téli búza, No till'}
]


const CropPage = ({

}) => {

    return (
        <Grid container>
            <Grid item xs={6}>
                <Field 
                    name="template"
                    component={Autocomplete}
                    disableClearable={true}
                    options={templates}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.title}
                    inputParams={{
                        label: "Select template"
                    }}                
                />            
            </Grid>
            <Grid item xs={6}>
                <Field
                    name="firstName"
                    component={TextField}
                    type="text"
                    placeholder="Last Name"
                    //validate={required}
                />
            </Grid>
            <StepperNext
                title={globalMessages.next}
            />
        </Grid>                
    )
}

CropPage.propTypes = {

}

export default CropPage