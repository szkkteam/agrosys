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

const Section = styled.div`
    ${spacing}
`

const ResourceSection = ({
    ...props
}) => {
    const intl = useIntl()

    return (
        <FormCardLayout
            mt={3}
            title={intl.formatMessage(messages.resource)}
        >
            
        </FormCardLayout>
    )
}

ResourceSection.propTypes = {

}

export default React.memo(ResourceSection)