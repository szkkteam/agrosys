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

import StepperNext from './StepperNext'


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

const CropPage = ({

}) => {

    return (
        <>          
            <Field
                name="cropType"
                component={TextField}
                type="text"
                placeholder="Crop type"
                //validate={required}
            />
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

CropPage.propTypes = {

}

export default CropPage