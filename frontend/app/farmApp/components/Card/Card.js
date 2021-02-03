import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';

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

const ScrollContent = styled(({disableBottomPadding=false, ...props}) => <CardContent {...props} />)`
    ${({disableBottomPadding}) => `
        overflow-y: hidden;
        display: flex;
        padding: 16px 0;
        padding-bottom: ${(disableBottomPadding? `0px`:`20px`)};
    `}
    
`

const Card = ({
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
