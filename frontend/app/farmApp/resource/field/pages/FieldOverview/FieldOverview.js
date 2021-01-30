import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { FieldLayoutRouter } from '../../components'

const Master = () => <div>Master list</div>
const Detail = () => <div>Map</div>


import { withLinkComponent } from 'utils/hoc'

import { Button } from "@material-ui/core";
import { routes } from '../../../routes';

const Link = withLinkComponent(Button)


export default ({

}) => {
    const intl = useIntl()

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <FieldLayoutRouter />
        </>
    )
}
/*
            <FieldLayoutRouter
            />            
*/
