import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import {
    CropPlanSelect
} from 'farmApp/plan/cropPlan/components'


import OperationTaskTypeSelect from '../../OperationTaskTypeSelect/OperationTaskTypeSelect'
import FormSection from '../FormSection'

const Section = styled.div`
    ${spacing}
`

const initialValues = {
    cropPlan: "",
    taskType: "",
    taskSubtype: "",
}

const CropTaskTypeSection = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <FormSection
            title="Task setup"
            expandable={false}
        >
            <Section>
                <CropPlanSelect
                    name="cropPlan"
                    variant="outlined"
                    label="Crop plan"
                />
            </Section>
            <Section mt={2}>
                <OperationTaskTypeSelect 
                    name="taskType"
                    label="Task Type"
                    variant="outlined"
                />                                        
            </Section>
            <Section mt={2}>
                <Field
                    name="taskSubtype"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    label="Task subtype"
                />
            </Section>
        </FormSection>
    )
}

CropTaskTypeSection.propTypes = {

}

CropTaskTypeSection.initialValues = initialValues

export default React.memo(CropTaskTypeSection)