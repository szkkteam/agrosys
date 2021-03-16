import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from '../messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import {
    FormCardLayout
} from 'farmApp/components'

import {
    CropPlanSelect
} from 'farmApp/plan/cropPlan/components'


import TaskTaskTypeSelect from '../../TaskTaskTypeSelect/TaskTaskTypeSelect'


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
        <FormCardLayout
            title={intl.formatMessage(messages.taskSetup)}
            expandable={false}
        >
            <Section>
                <CropPlanSelect
                    name="cropPlan"
                    variant="outlined"
                    label={intl.formatMessage(messages.cropPlan)}
                />
            </Section>
            <Section mt={2}>
                <TaskTaskTypeSelect 
                    name="taskType"
                    variant="outlined"
                    label={intl.formatMessage(messages.taskType)}
                />                                        
            </Section>
            <Section mt={2}>
                <Field
                    name="taskSubtype"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    label={intl.formatMessage(messages.taskSubType)}
                />
            </Section>
        </FormCardLayout>
    )
}

CropTaskTypeSection.propTypes = {

}

CropTaskTypeSection.initialValues = initialValues

export default React.memo(CropTaskTypeSection)