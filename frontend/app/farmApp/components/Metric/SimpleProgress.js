import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

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

const TopTextContainer = styled.div`
    padding-bottom: 6px;
    width: 100%;
    display: flex;
`

const ThickProgress = styled(LinearProgress)`
    height: 15px;
    border-radius: 5px;
`

const SimpleProgress = ({
    className,
    style,
    title,
    valueText,
    textProps={},
    progress,
    children,
    ...props
}) => {
    return (
        <FullWidth className={className} style={style}>
            <TopTextContainer>
                <Typography variant="body2" {...textProps}>
                    {title}
                </Typography>
                    <Spacer />
                <Typography variant="body2" {...textProps}>
                    {valueText}
                </Typography>
            </TopTextContainer>
            
            <ThickProgress
                variant="determinate"
                value={progress}
            />
            {children}
        </FullWidth>
    )
}

SimpleProgress.propTypes = {
    title: PropTypes.node.isRequired,
    valueText: PropTypes.node,
    textProps: PropTypes.object,
    progress: PropTypes.number.isRequired,
}

export default SimpleProgress