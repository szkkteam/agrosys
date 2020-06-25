import React from 'react'

import { PageContent } from 'components'
import { FIELD_VIEW_TYPES } from '.../constants'

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
                <h1>
                    Field List view
                </h1>
            </PageContent>
        )
    }
}