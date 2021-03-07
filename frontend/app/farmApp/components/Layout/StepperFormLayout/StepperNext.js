import React, { useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    PrimaryButton
} from 'components'


const NextButton = styled(PrimaryButton)`
   margin: 0;
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