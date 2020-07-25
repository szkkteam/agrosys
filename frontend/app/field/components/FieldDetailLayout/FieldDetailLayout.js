import React from 'react'
import './fielddetaillayout.scss'

import { 
    FieldDetailTabContainer,

} from 'field/components'

export default class FieldDetailLayout extends React.Component 
{
    /**
     * TODO: This component should render all the child elements on the screen. (Breadcrumbs, Top-right carousel, main tabbed window.)
     */
    render() {
        const { field, ...rest } = this.props
        return(
            <FieldDetailTabContainer
                field={field}
                {...rest}
            />
        )
    }
}
