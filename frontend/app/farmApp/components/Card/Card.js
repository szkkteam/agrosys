import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import { useSplitComponents } from 'utils/hooks'

import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import {
    Fab,
    Chip,
    Avatar,
    Button,
    Paper,
    IconButton,
    Card as MuiCard,
    CardHeader,
    CardContent,
    CardActions
} from '@material-ui/core'

const FullHeightCard = styled(MuiCard)`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ScrollContent = styled(({disableBottomPadding=false, margin, spacing, ...props}) => <CardContent {...props} />)`
    ${Spacing}
    ${({disableBottomPadding}) => `
        overflow-y: hidden;
        height: 100%;
        display: flex;
        //padding: 16px 0;
        padding-bottom: ${(disableBottomPadding? `0px`:`16px`)};
    `}
    
`

const Card = ({
    margin=0,
    spacing=[2, 0],
    className,
    children,
    ...props
}) => {
    
    const [header=null, content=null, actions=null] = useSplitComponents(children)

    return (
        <FullHeightCard className={className}>
            {_.isFunction(header)? 
                header()
                : 
                header ?? null
            }
            <ScrollContent
                margin={margin}
                spacing={spacing}
                disableBottomPadding={!!actions}
            >
                {_.isFunction(content)? 
                    content()
                    : 
                    content ?? null
                }
            </ScrollContent>
            {actions && <CardActions>
                {_.isFunction(actions)? 
                    actions()
                    : 
                    actions ?? null
                }
            </CardActions> }
        </FullHeightCard>
    )
}


Card.propTypes = {

}

export default Card
