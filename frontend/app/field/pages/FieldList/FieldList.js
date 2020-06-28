import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'
import { FieldListView } from 'field/components'

const FIELD_VIEW_TYPES = {
    LIST_VIEW: "list-view",
    CARD_VIEW: "card-view"
}

export default class FieldList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayView : FIELD_VIEW_TYPES.LIST_VIEW,
        }
    }

    setListView = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.LIST_VIEW })
    }

    setCardView = () => {
        this.setState({ displayView: FIELD_VIEW_TYPES.CARD_VIEW })
    }

    render() {
        return (
            <PageContent>
                <Helmet>
                <title>
                    Field List
                </title>
                </Helmet>
                <FieldListView>
                </FieldListView>
            </PageContent>
        )
    }
}