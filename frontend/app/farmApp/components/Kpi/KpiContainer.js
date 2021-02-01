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

const KpiContainer = ({
    className,
    icon: Icon,
    title,
    subheader,
    children,
    ...props
}) => {
    const intl = useIntl()

    return (
        <Card className={className}>
            <CardHeader
                avatar={
                    Icon? (
                        <Icon/>
                    ) : (
                        <Avatar aria-label="recipe" >
                        {intl.formatMessage(title).charAt(0)}
                        </Avatar>
                    )
                }
                action={
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                }
                title={intl.formatMessage(title)}
                subheader={subheader && intl.formatMessage(subheader)}
            />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}


KpiContainer.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.object.isRequired,
    subheader: PropTypes.object,
}

export default KpiContainer
