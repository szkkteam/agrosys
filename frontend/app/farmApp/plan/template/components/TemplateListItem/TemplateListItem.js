import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { CropTag } from 'farmApp/product/crop/components'
import { useSelectCropPlan } from 'farmApp/plan/cropPlan/hooks'


import {
    Typography,

    List,
    ListItem,
    ListItemText,
    ListSubheader,
} from '@material-ui/core'

const TemplateListItem = ({
    className,
    title,
    cropPlanId,
    ...props
}) => {
    const { payload, isLoading } = useSelectCropPlan(cropPlanId)
    
    return (
        <ListItem 
            className={className}
            button
            divider
        >
            <ListItemText
                disableTypography
                primary={
                    <Typography variant="body1" display="block">
                        {title}
                    </Typography>
                }
            />
            {!isLoading && <CropTag
                {...payload.cropType}
            />}
            
        </ListItem>
    )
}

TemplateListItem.propTypes = {

}

export default TemplateListItem