import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import {
    FormCardLayout
} from 'farmApp/components'

const Section = styled.div`
    ${spacing}
`

const initialValues = {
    title: "",
    notes: ""
}

const MainSection = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <FormCardLayout
            //title="General"
        >
            <Field
                name="title"
                fullWidth
                component={TextField}
                variant="outlined"
                label="Task title"
            />
            <Section mt={2}>
                <Field
                    name="notes"
                    fullWidth
                    multiline
                    rows={8}
                    component={TextField}
                    variant="outlined"
                    label="Description"
                />
            </Section>
        </FormCardLayout>
    )
}

MainSection.propTypes = {

}

MainSection.initialValues = initialValues

export default React.memo(MainSection)