import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    KpiContainer,
} from 'farmApp/components'

import {
    Typography,
} from '@material-ui/core'

const FullHeightContainer = styled(KpiContainer)`
    height: 100%;
`

const CropExpense = ({

}) => {
    const progress = 86
    return (
        <FullHeightContainer
            title={messages.title}
            subheader={messages.subheader}
        >
            TODO: Expenses
        </FullHeightContainer>
    )
}


CropExpense.propTypes = {

}

export default CropExpense
