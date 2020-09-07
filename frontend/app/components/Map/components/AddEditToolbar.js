import React from 'react'

import {
    AddParcelButton,
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
            <AddParcelButton       
                onParcelAdd={onAdd}
            />
            { selectedParcel &&
                <EditParcelButton
                    title={selectedParcel.title}
                    onEdit={onEdit}
                />
            }
        </React.Fragment>                
    )
}
