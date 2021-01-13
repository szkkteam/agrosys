import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    Tabs,
    Tab,
    Button,
} from '@material-ui/core'


const PlanAddParcelButton = ({
    ...props
}) => {
    return (
        <Button
            color="primary"
            variant="contained"
            style={{width: "15%", marginTop: "10px"}}
            {...props}
        >
            Add parcel
        </Button>
    )
}

PlanAddParcelButton.propTypes = {

}

export default PlanAddParcelButton