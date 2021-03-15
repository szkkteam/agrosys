import React from 'react'

import {
    SplitButton
} from 'components/Button'

import {
    createTemplateEnums,
} from 'template/constants'

const options = [
    {
        type: "item",
        disabled: false,
        key: createTemplateEnums.CREATE_FROM_SCRATCH,
        title: 'Create from scratch'

    },
    {
        type: "item",
        disabled: false,
        key: createTemplateEnums.CREATE_FROM_TEMPLATE,
        title: 'Create from template',
    },
]

export default ({
    onClick,
}) => {
    return (
        <React.Fragment>
            <SplitButton 
                options={options}
                handleClick={onClick}
            />
        </React.Fragment>
    )
}
