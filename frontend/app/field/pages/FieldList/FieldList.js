import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'
import { Fields } from 'field/components'

export default class FieldList extends React.Component {
   
    render() {
        return (
            <PageContent>
                <Helmet>
                <title>
                    Field List
                </title>
                </Helmet>
                <Fields />
            </PageContent>
        )
    }
} 