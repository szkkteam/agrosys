import React, { useContext, useMemo, useEffect } from 'react'
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { spacing } from '@material-ui/system';


import StepperNext from './StepperNext'
import StepperBack from './StepperBack'

const Flex = styled.div`
    ${spacing}
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const FormFooter = ({
    title,
    ...props
}) => {

    return (
        <Flex mt={5}>
            <StepperBack
                title={globalMessages.back}
            />
            <Spacer />
            <StepperNext
                title={title}
            />
        </Flex>
    )
}

FormFooter.propTypes = {

}


export default FormFooter