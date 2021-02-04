import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'


import InfoIcon from '@material-ui/icons/Info';
import {
    Chip,
    Avatar,
    Button,
    IconButton,
    Card,
    CardHeader,
    CardContent,
    
} from '@material-ui/core'

const FullHeightCard = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ScrollContent = styled(CardContent)`
    overflow-y: auto;
`

const DashboardWidget = ({
    className,
    icon: Icon,
    title,
    subheader,
    children,
    ...props
}) => {
    const intl = useIntl()

    
    return (
        <FullHeightCard className={className}>
            <CardHeader
                /*
                avatar={
                    Icon? (
                        <Icon/>
                    ) : (
                        <Avatar aria-label="recipe" >
                        {intl.formatMessage(title).charAt(0)}
                        </Avatar>
                    )
                }
                */
                action={
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                }
                title={intl.formatMessage(title)}
                subheader={subheader && intl.formatMessage(subheader)}
            />
            <ScrollContent>
                {children}
            </ScrollContent>
        </FullHeightCard>
    )
}


DashboardWidget.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.object.isRequired,
    subheader: PropTypes.object,
}

export default DashboardWidget
