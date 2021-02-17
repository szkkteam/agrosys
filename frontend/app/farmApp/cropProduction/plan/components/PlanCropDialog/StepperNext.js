import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    PrimaryButton
} from 'components'


const NextButton = styled(PrimaryButton)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    //transform: translateX(-50%);
`

const StepperNext = (props) => {

    return (
        <NextButton
            type="submit"
            {...props}
        />
    )
}

StepperNext.propTypes = {

}

export default StepperNext