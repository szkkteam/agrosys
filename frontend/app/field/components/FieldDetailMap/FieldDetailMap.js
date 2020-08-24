import React from 'react'

import { 
    Map,
    MapFeature,
    MapControl,
} from 'components/Map/components'

import { 
    FormFieldDetailDraw,
} from 'field/components'

import './fielddetailmap.scss'
/**
     <GeoJSON 
        key={lastFieldDetail.id}
        data={lastFieldDetail.shape} />
 */
export default class FieldDetailMap extends React.Component 
{
   
    constructor(props) {
        super(props)

        
    }   

    render() {
        const { 
            fields,
            onClickFeature,
            onMouseHoverFeature,
            children
         } = this.props

        //const { featureInEdit } = this.state

        //console.log("this.featureInEdit render: ", featureInEdit)
        return(
            <Map
                enableEdit={true}
            >
                { children }
                { fields && Array.isArray(fields) && fields.map((field, id) => {
                    return <MapFeature
                                key={field.id}
                                field={field}
                                onMouseHover={onMouseHoverFeature}
                                 onClick={onClickFeature}
                            /> 
                 })}
            </Map>
        )
    }
}

