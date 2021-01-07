import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'
import { ROUTES, ROUTE_MAP } from 'routes'

import { 
    TabHeader,
} from 'components'
import { LanguageSelector } from 'site/components'

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

    const tabs = [
        {to: ROUTES.Login, value: 0, label: intl.formatMessage(messages.tabLogin)},
        {to: ROUTES.SignUp, value: 1, label: intl.formatMessage(messages.tabSignup)},
    ]

    return (
        <Container>
            <Flex>
                <Spacer />
                <LanguageSelector />
            </Flex>
            
            <TabHeader
                redirect={false}
                items={tabs}
                match={match}
                indicatorColor="primary"
            />
        </Container>
    )
}

AuthHeader.propTypes = {
}

export default AuthHeader
