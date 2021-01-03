import React, { useRef, useMemo, useLayoutEffect, useState, Children } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ItemMenu } from 'components'

import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Avatar
} from '@material-ui/core'

const FlexContent = styled(CardContent)`
    flex-grow: 1;
`

const WidgetContainer = ({
    keyProp,
    gridPosition={},
    gridSize,
    headerProps={},
    children,
    onRemove,
    ...props
}) => {

    const removeWidget = () => {
        onRemove && onRemove(keyProp)
    }

    const items = [
        {title: messages.remove, onClick: removeWidget}
    ]

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar aria-label="tasks" >
                    T
                    </Avatar>
                }
                action={
                    <ItemMenu 
                        icon={MoreVertIcon}
                        items={items}
                        placement="left"
                    />
                }
                {...headerProps}
            />
            <FlexContent>
                {children}
            </FlexContent>
        </>
    )
}

WidgetContainer.propTypes = {
    //keyProp: PropTypes.string.isRequired,
    gridPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    gridSize: PropTypes.object,
    headerProps: PropTypes.object,
    //children: PropTypes.element.isRequired,
}

export default WidgetContainer