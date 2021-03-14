import React from 'react'

import {
    AddParcelButtonContainer,
    EditParcelButton,
} from 'parcel/components'

export default ({
    onAdd,
    onEdit,
    selectedParcel,
    ...rest
}) => {
    return (
        <React.Fragment>
            { selectedParcel &&
                <EditParcelButton
                    title={selectedParcel.title}
                    onEdit={onEdit}
                />
            }
        </React.Fragment>                
    )
}
