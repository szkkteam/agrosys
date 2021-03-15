import React from 'react'

import {
    SplitButton
} from 'components/Button'

export default ({
    buttons,
    onClick,
}) => {
    return (
        <SplitButton 
            options={buttons}
            handleClick={onClick}
            placement="top"
        />
    )
}
