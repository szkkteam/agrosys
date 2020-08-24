import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'

import {
    MapContainer
} from 'map/components'

export default (props) => {
    return (
        <PageContent>
            <Helmet>
            <title>
                Map
            </title>
            </Helmet>
            <MapContainer />
        </PageContent>
    )
}
