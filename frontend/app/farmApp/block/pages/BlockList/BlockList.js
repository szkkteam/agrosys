import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";
import { PageContent, HeaderContent, MasterDetail } from 'components'
import { 
    BlockHeader,
    BlockMapView,
    BlockListView,
    BlockModuleView
} from '../../components'
import { useQuery } from 'utils/hooks'

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

export default ({
    history,
    match,
    ...rest  
}) => {
    const intl = useIntl()
    const query = useQuery()
    
    console.log("Props: ", rest)
    console.log("Query: ", )
    // 1) Pass along the history and match props
    // 2) Make the main page to accept every route which is just starting with /fields/*****
    // 3) Depends on the query parameters like fields?view=list create different componenets in the content
    // 4) Let the header view change buttons change the query parameter in the route
    // 5) Do a nested route in the master - detail pane where clicking on the master will trigger a dynamic route change like: fields/<field_id>?view=map
    useEffect(() => {
        switch(query.get('view')) {
            case VIEW_MAP:
            case VIEW_LIST:
            case VIEW_MODULE:
                break
            default:
                // TODO: Get the prefered view from storage/redux and apply
                history.replace(`${match.path}/?view=${VIEW_MAP}`)
        }
    }, [query])

    const viewLookup = {
        [VIEW_MAP]: BlockMapView,
        [VIEW_LIST]: BlockListView,
        [VIEW_MODULE]: BlockModuleView,
    }

    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <HeaderContent
                header={
                    <BlockHeader
                        history={history}
                        match={match}
                        {...rest}
                    />
                }
                content={ 
                    <Route render={props => {
                        const Component = viewLookup[query.get('view')] || BlockMapView
                        return (
                            <Component
                                location={location}
                                history={history}
                                match={match}
                                {...props}
                            />
                            )
                    }}
                    />
                }
            />
        </PageContent>
    )
}