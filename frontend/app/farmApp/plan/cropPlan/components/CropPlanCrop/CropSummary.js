import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { CropTag } from 'farmApp/product/crop/components'

import {
    Typography,
    Avatar,
    Chip
} from '@material-ui/core'

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const SpacingCropTag = styled(CropTag)`
    margin-right: 15px;
`

const CropSummary = ({
    title,
    cropType,
    ...props
}) => {

    return (
            <Flex>
                <SpacingCropTag
                    {...cropType}
                />
                
                <Typography variant="body2">
                    {title}
                </Typography>
            </Flex>

    )
}

CropSummary.propTypes = {

}

export default CropSummary