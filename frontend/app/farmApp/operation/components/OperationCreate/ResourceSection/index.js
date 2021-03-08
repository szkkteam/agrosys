import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'components/FormB'

import FormSection from '../FormSection'

const Section = styled.div`
    ${spacing}
`

const ResourceSection = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <FormSection
            mt={3}
            title="Resource reservation"
        >
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
        </FormSection>
    )
}

ResourceSection.propTypes = {

}

export default React.memo(ResourceSection)