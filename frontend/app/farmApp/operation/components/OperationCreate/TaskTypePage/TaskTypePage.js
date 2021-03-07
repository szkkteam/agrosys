import React, { useState, useMemo, useRef, useCallback } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field, Form, FieldArray } from 'formik';
//import { TextField } from 'formik-material-ui';
import { TextField, Number } from 'components/FormB'
import { spacing } from '@material-ui/system';
import * as Yup from 'yup';

import {
    Grid
} from '@material-ui/core'

import {
    CropPlanSelect
} from 'farmApp/plan/cropPlan/components'

import schema from './schema'


const TaskTypePage = ({
    values,
    ...props
}) => {
   

    return (
        <Grid item xs={12}>
            <CropPlanSelect
                name="cropPlan"
                variant="outlined"
                label="Crop plan"
            />
        </Grid>
    )
}

TaskTypePage.propTypes = {

}


TaskTypePage.initialValues = {
   
}

TaskTypePage.schema = schema

export default TaskTypePage