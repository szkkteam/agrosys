import React from 'react'

import { HiddenField, TextField } from 'components/Form'

import { SelectSoil } from 'soil/components'


export const FormFieldDetailSection = ({ namespace, ...rest }) => (
    <div>
        <TextField name={`${namespace}.value`}
                    label="Field value"
                    className="full-width"
                    autoFocus />
        <TextField name={`${namespace}.area`} 
                    label="Field area in m2"
                    className="full-width"
                    autoFocus/>
        <HiddenField name={`${namespace}.shape`} />
        <SelectSoil
            namespace={namespace}
            {...rest}
        />
    </div>
)