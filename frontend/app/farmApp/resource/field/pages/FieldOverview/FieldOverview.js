import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from 'farmApp/resource/field/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    MasterDetail
} from 'components'

import { 
    FieldMapMaster,
    FieldMapDetail
} from 'farmApp/resource/field/components'

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
            <MasterDetail
                spacing={0}
            >
                <FieldMapMaster
                />
                <FieldMapDetail
                />
            </MasterDetail>
        </>
    )
}
/*
            <FieldLayoutRouter
            />            
*/
