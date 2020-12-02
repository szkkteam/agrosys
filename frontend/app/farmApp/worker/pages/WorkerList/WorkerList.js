import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { PageContent, HeaderContent } from 'components'
import { 
    WorkerHeader,
    WorkerRoleLayout,
    WorkerWorkerLayout
} from '../../components'

import { TAB_WORKERS, TAB_ROLES } from '../../constants'

/*
<Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <HeaderContent
                header={
                    <WorkerHeader
                        match={match}
                    />
                }
                content={
                    <div style={{height: "100%"}}>
                        <Route                  
                            path={ROUTE_WORKER}
                            exact
                            component={(props) => <WorkerWorkerLayout {...props}/>}
                        />
                        <Route 
                            path={ROUTE_ROLE}
                            exact
                            component={(props) => <WorkerRoleLayout {...props} />}
                        />   
                    </div>
                }
            />
*/

export default ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()

    const ROUTE_WORKER = `${match.path}/${TAB_WORKERS}`
    const ROUTE_ROLE = `${match.path}/${TAB_ROLES}`

    return (
        <h1>Workers list</h1>
    )
}