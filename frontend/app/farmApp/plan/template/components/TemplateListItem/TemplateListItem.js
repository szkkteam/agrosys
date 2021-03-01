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

    List,
    ListItem,
    ListItemText,
    ListSubheader,
} from '@material-ui/core'

const TemplateListItem = ({
    className,
    title,
    cropType,
    ...props
}) => {

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
                secondary={
                    <CropTag
                    {...cropType}
            />
                }

            />
            
        </ListItem>
    )
}

TemplateListItem.propTypes = {

}

export default TemplateListItem