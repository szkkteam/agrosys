import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'
import { MapView } from 'pages/components'

export default (props) => {
    return (
        <PageContent>
            <Helmet>
            <title>
                Map
            </title>
            </Helmet>
            <MapView />
        </PageContent>
    )
}
