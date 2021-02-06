import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    WidgetLight,
} from 'farmApp/components'

import {
    Typography,
    LinearProgress,
    
} from '@material-ui/core'

const Spacer = styled.div`
    flex-grow: 1;
`

const FullWidth = styled.div`
    width: 100%;
`

const CultivatedArea = ({

}) => {
    const progress = 86
    return (
        <WidgetLight
            title={messages.title}
            subheader={messages.subheader}
        >
            <FullWidth>
                <div style={{ paddingBottom: "10px", width: "100%", display: "flex"}}>
                <Typography variant="h5">
                    Utilization:
                </Typography>
                    <Spacer />
                <Typography variant="h5">
                    86.5%
                </Typography>
                </div>
                
                <LinearProgress
                    variant="determinate"
                    value={progress}
                />
                <Typography variant="caption">
                    67.5 ha / 102 ha
                </Typography>
            </FullWidth>
        </WidgetLight>        
    )
}


CultivatedArea.propTypes = {

}

export default CultivatedArea
