import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES, ROUTE_MAP } from 'security/routes'

import { TabsRoute } from 'components'

import { LanguageSelector } from 'site/components'


const useStyles = makeStyles((theme) => ({
    indicator: {
        backgroundColor: theme.palette.primary.main,
      },
}));


const Container = styled.div`

`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const AuthHeader = ({
    match,
    ...props
}) => {
    const intl = useIntl()
    const classes = useStyles();

    const tabs = [
        {to: ROUTES.Authentication, value: {tab: 'login' }, label: intl.formatMessage(messages.tabLogin) },
        {to: ROUTES.Authentication, value: {tab: 'sign-up' }, label: intl.formatMessage(messages.tabSignup) },
    ]

    return (
        <Container>
            <Flex>
                <Spacer />
                <LanguageSelector />
            </Flex>
            
            <TabsRoute
                routeMap={ROUTE_MAP}
                items={tabs}
                valueAccessor="tab"
                indicatorColor="primary"
                variant="fullWidth"
                classes={{ indicator: classes.indicator }} 
            />
        </Container>
    )
}

AuthHeader.propTypes = {
}

export default AuthHeader
