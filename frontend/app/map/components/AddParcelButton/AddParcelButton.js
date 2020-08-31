import React from 'react'

import {
    SplitButton
} from 'components/Button'

export default ({
    buttons,
    onParcelAdd,
}) => {
    return (
        <React.Fragment>
            <SplitButton 
                options={buttons}
                handleClick={onParcelAdd}
            />
        </React.Fragment>
    )
}
