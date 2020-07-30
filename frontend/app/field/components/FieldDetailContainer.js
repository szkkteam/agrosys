import React from 'react'

import { 
    FieldDetailMapTab,

} from 'field/components'

export default class FieldDetailContainer extends React.Component 
{

    constructor(props) {
        super(props)

        this.state = {
            selectedFieldDetail: this.props.field.fields[0],
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field !== this.props.field) {
            this.setState({
                selectedFieldDetail: nextProps.field.fields[0],
            })
        }
    }

    onDetailSelected = (fieldDetail) => {
        //console.log("fieldDetail: ", fieldDetail)
        this.setState({
            selectedFieldDetail: fieldDetail,
        })
    }

    render() {
        const { field, ...rest } = this.props
        const { selectedFieldDetail } = this.state
        return(
            <FieldDetailMapTab
                field={field}
                selectedFieldDetail={selectedFieldDetail}
                onDetailSelected={this.onDetailSelected}
                {...rest}
            />
        )
    }
}
