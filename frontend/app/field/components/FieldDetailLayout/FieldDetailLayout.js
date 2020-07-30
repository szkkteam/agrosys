import React from 'react'
import './fielddetaillayout.scss'

import { 
    FieldDetailContainer,

} from 'field/components'

export default class FieldDetailLayout extends React.Component 
{
    /**
     * TODO: This component should render all the child elements on the screen. (Breadcrumbs, Top-right carousel, main tabbed window.)
     */
    render() {
        return(
            <FieldDetailContainer
                {...this.props}
            />
        )
    }
}
