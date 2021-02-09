import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    WidgetLight,
    SimpleProgress
} from 'farmApp/components'

import {
    Typography,
} from '@material-ui/core'

const CultivatedArea = ({

}) => {
    const progress = 86
    return (
        <WidgetLight
            title={messages.title}
            //subheader={messages.subheader}
        >
            <SimpleProgress
                title="Utilization:"
                valueText="86.5%"
                progress={86.5}
                textProps={{
                    //variant: "h6"
                }}
            >
                <Typography variant="caption">
                    67.5 ha / 102 ha
                </Typography>
            </SimpleProgress>
        </WidgetLight>        
    )
}


CultivatedArea.propTypes = {

}

export default CultivatedArea
