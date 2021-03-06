import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Typography,
    ClickAwayListener,
    Chip
} from '@material-ui/core'

const AnimatedChip = styled(Chip)`
`

const CropTag = ({
    title,
    short,
    defaultExpand=false,
    ...props
}) => {

    const [clicked, setClicked] = useState(defaultExpand)

    const toggleExpand = (e) => {
        e.stopPropagation()
        setClicked(!clicked)
    }

    const handleShrink = (e) => {
        e.stopPropagation()
        setClicked(defaultExpand)
    }

    return (
        <ClickAwayListener onClickAway={handleShrink}>
            <AnimatedChip
                clickable
                size="small"
                label={clicked? title: short}
                onClick={toggleExpand}
                {...props}
            />
        </ClickAwayListener>
    )
}

CropTag.propTypes = {

}

export default CropTag