import React from 'react'

import { 
    SplitPane,
    FieldDetailSideMap,
} from 'field/components'

export default class FieldDetailTabContainer extends React.Component {

    render() {
        const { field } = this.props
        return (
            <SplitPane
                leftSize={9}
                rightSize={3}
            >
                <FieldDetailSideMap
                    field={field}
                />
                <div>Field details pane</div>
            </SplitPane>
        )
    }
}