import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    ExpandPanel
} from 'farmApp/components'

const CropPlanCrop = ({
    ...props
}) => {
    return (
        <ExpandPanel
            {...props}
            summary={
                <div>Crop</div>
            }
        >
            <div>tasks</div>
        </ExpandPanel>
    )
}

CropPlanCrop.propTypes = {

}

export default CropPlanCrop