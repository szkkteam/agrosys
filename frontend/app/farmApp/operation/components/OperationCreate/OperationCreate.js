import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import {
    StepperFormLayout
} from 'farmApp/components'

import {
    CropPlanSelect
} from 'farmApp/plan/cropPlan/components'

import {
    Grid,
    Paper,
    Typography,
    Divider,
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core'

import OperationTaskTypeSelect from '../OperationTaskTypeSelect/OperationTaskTypeSelect'
import { getTaskTypeFromId } from '../../constants'


const Section = styled.div`
    ${spacing}
`

const OperationCreate = ({
    season,
    taskType,
}) => {
    const intl = useIntl()

    return (
        <Formik
            initialValues={{
            season,
            taskType: getTaskTypeFromId(taskType),
            _error: "",
            }}
            //onSubmit={submit(login)}
        >
            {({isSubmitting, dirty, errors, values, ...props}) => (
                <Form>
                    <Grid container spacing={4}>
                        <Grid item xs={8}>
                            <Section>
                                <Card>
                                    <CardContent>
                                        <Field
                                            name="title"
                                            fullWidth
                                            component={TextField}
                                            variant="outlined"
                                            label="Task title"
                                        />
                                    </CardContent>
                                </Card>
                            </Section>
                            <Section mt={3}>
                                <Card>
                                    <CardHeader
                                        title="Planning"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Section>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="Start date"
                                            />
                                        </Section>
                                        <Section mt={2}>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="End date"
                                            />
                                        </Section>
                                    </CardContent>
                                </Card>
                            </Section>
                            <Section mt={3}>
                                <Card>
                                    <CardHeader
                                        title={`${intl.formatMessage(values.taskType.title)} - Parameters`}
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Section>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="Start date"
                                            />
                                        </Section>
                                        <Section mt={2}>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="End date"
                                            />
                                        </Section>
                                    </CardContent>
                                </Card>
                            </Section>
                            <Section mt={3}>
                                <Card>
                                    <CardHeader
                                        title="Assigned resources"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Section>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="Start date"
                                            />
                                        </Section>
                                        <Section mt={2}>
                                            <Field
                                                name="title"
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                label="End date"
                                            />
                                        </Section>
                                    </CardContent>
                                </Card>
                            </Section>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader
                                    title="Organize"
                                />
                                <Divider />
                                <CardContent>
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
                                </CardContent>
                            </Card>                            
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

OperationCreate.propTypes = {

}

export default OperationCreate