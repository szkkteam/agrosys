import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
/*
 TODO: This is causing some weird error when the crop add model is opened
 
import { withLinkComponent } from 'utils/hoc'
import { ROUTES } from 'farmApp/routes'
import styled from 'styled-components'

import { Link } from '@material-ui/core';

const PrimaryLink = styled(Link)`
    ${({theme}) => `
        color: ${theme.palette.primary.contrastText};
    `}
    
`

const LinkTo = withLinkComponent(PrimaryLink)
*/
export default ({title, id: seasonId}) => ({
    message: 
        <FormattedMessage
            {...messages.seasonCreated}
            values={{b: chunks => 
                /*
                <LinkTo 
                    color="initial"
                    to={ROUTES.CropProductionOverview}
                    params={{cropId}}
                >
                    {title}
                </LinkTo>
                */
                <b>{title}</b>
            }}
        />,
    options: {
        key: new Date().getTime() + Math.random(),
        variant: 'info',
    },
})