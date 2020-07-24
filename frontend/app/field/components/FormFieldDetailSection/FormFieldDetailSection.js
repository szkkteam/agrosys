import React from 'react'

import { HiddenField, TextField } from 'components/Form'

import { SelectSoil } from 'soil/components'


export default ({ namespace, ...rest }) => (
    <div>
        <TextField name={namespace? `${namespace}.value`: "value"}
                    label="Field value"
                    className="full-width"
                    autoFocus />
        <TextField name={namespace? `${namespace}.area`: "area"} 
                    label="Field area in m2"
                    className="full-width"
                    autoFocus/>
        <HiddenField name={namespace? `${namespace}.shape`: "shape"} />
        <SelectSoil
            namespace={namespace}
            {...rest}
        />
    </div>
)