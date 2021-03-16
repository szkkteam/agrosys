import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import {
    PrimaryButton
} from 'components'

import {
    Grid,
    Paper,
    Typography,
    Divider,
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core'

import TaskTaskTypeSelect from '../TaskTaskTypeSelect/TaskTaskTypeSelect'
import { getTaskTypeFromId } from '../../constants'

import CropTaskTypeSection from './CropTaskTypeSection'
import MainSection from './MainSection'
import PlanningSection from './PlanningSection'
import ResourceSection from './ResourceSection'

const Section = styled.div`
    ${spacing}
`

const TaskCreate = ({
    initialValues
}) => {
    const intl = useIntl()

    const {
        taskType,
        ...copyInitialValues
    } = initialValues

    copyInitialValues.taskType = getTaskTypeFromId(taskType)

    return (
        <Formik
            initialValues={{
                ...MainSection.initialValues,
                ...CropTaskTypeSection.initialValues,
                ...PlanningSection.initialValues,
                ...copyInitialValues,
                _error: "",
            }}
            //onSubmit={submit(login)}
        >
            {({isSubmitting, dirty, errors, values, ...props}) => (
                <Form>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <MainSection
                            />
                            <PlanningSection
                            />
                            <Section mt={3}>
                                <Card>
                                    <CardHeader
                                        title={`${intl.formatMessage(values.taskType.title)} - Parameters`}
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Section>
                                            <Field
                                                name="dates.start"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label={intl.formatMessage(messages.startDate)}
                                            />
                                        </Section>
                                        <Section mt={2}>
                                            <Field
                                                name="dates.end"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label={intl.formatMessage(messages.endDate)}
                                            />
                                        </Section>
                                    </CardContent>
                                </Card>
                            </Section>
                            <ResourceSection
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CropTaskTypeSection
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PrimaryButton
                                type="submit"
                                title={globalMessages.create}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

TaskCreate.propTypes = {

}

export default TaskCreate