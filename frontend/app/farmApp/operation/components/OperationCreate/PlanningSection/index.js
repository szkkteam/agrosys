import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { DatePicker } from 'components/FormB'


import {
    FormCardLayout
} from 'farmApp/components'

import {
    Grid
} from '@material-ui/core'

const Section = styled.div`
    ${spacing}
`
const initialValues = {
    dates: {
        start: new Date(),
        end: new Date()
    }
}

const PlanningSection = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <FormCardLayout
            mt={3}
            title="Planning"
        >

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Field
                        name="dates.start"
                        fullWidth
                        component={DatePicker}
                        variant="outlined"
                        label="Start date"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        name="dates.end"
                        fullWidth
                        component={DatePicker}
                        variant="outlined"
                        label="End date"
                    />
                </Grid>
            </Grid>
        </FormCardLayout>

         
    )
}

PlanningSection.propTypes = {

}

PlanningSection.initialValues = initialValues

export default React.memo(PlanningSection)