import React from 'react'

import { HiddenField, TextField } from 'components/Form'

//import { SelectSoil } from 'soil/components'

import './formfielddetailsection.scss'

export default ({ namespace, ...rest }) => (
    <div>
        <TextField name={namespace? `${namespace}.value`: "value"}
                    label="Field value"
                    className="form-detailsection-row"
                    autoFocus />
        <TextField 
            name={namespace? `${namespace}.area`: "area"} 
            label="Field area in m2"
            className="form-detailsection-row"
            onBlur={(e) => {e.preventDefault() }}
            autoFocus/> 
        <HiddenField
            name={namespace? `${namespace}.shape`: "shape"}
            onBlur={(e) => {e.preventDefault() }}
        />
  
    </div>
)