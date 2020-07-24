import React from 'react'

import { 
    MapControl,
} from 'map/components'

import { 
    FormFieldDetailDraw,
} from 'field/components'


export default ({onClickCancel, onClickEdit, menuOpen, featureInEdit, field}) => (
    <MapControl>
        { menuOpen? 
            <div>
                <button 
                    style={{backgroundColor: "white"}}
                    onClick={onClickCancel} 
                >
                    Cancel
                </button>      
                <FormFieldDetailDraw
                    featureInEdit={featureInEdit}
                    selectedField={field}
                />                      
            </div> 
        :
            <button 
                style={{backgroundColor: "white"}}
                onClick={onClickEdit} 
            >
                Edit
            </button>      
        }                    
    </MapControl>
)
