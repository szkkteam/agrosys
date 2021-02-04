import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { MASTER_DETAIL_BREAKPOINT } from 'farmApp/constants'

import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { FieldAppBar } from '../../components'

const Master = () => <div>Master list</div>
const Detail = () => <div>Map</div>

export default ({

}) => {
    const intl = useIntl()

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up(MASTER_DETAIL_BREAKPOINT));

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <FieldAppBar
                title={messages.title}
            />
            {isLarge? (
                <Redirect to="/resources/overview/fields" />
            ) : (
                <div>Map view</div>
            )}
            
        </>
    )
}
/*
            <FieldLayoutRouter
            />            
*/
