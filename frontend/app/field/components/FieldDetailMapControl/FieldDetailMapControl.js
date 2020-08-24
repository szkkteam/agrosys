import React from 'react'

import { 
    MapControl,
} from 'components/Map/components'


export default ({onClickCancel, onClickEdit, menuOpen, form}) => (
    <MapControl>
        { menuOpen? 
            <div>
                <button 
                    style={{backgroundColor: "white"}}
                    onClick={onClickCancel} 
                >
                    Cancel
                </button>      
                {form}                   
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
