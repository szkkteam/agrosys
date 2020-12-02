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
        <WorkerHeader
            match={match}
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
        <div >
        <WorkerHeader
            match={match}
        />
        </div>


    )
}