import React from 'react'
import Control from 'react-leaflet-control';

export default class MapControl  extends React.Component {

    render() {
        const { children } = this.props
        return (
            <Control position="topright" >
                <div>
                    {children}
                </div>
            </Control>
        )
    }

}
                