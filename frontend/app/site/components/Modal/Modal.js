import React from 'react'
import Dialog from '@material-ui/core/Dialog';

//{React.cloneElement(children, {...props, resultTypes, popModalWindow})}

const Modal = ({
    children,
    resultTypes,
    popModalWindow,
    ...props
}) => {

    return (
        <Dialog
            disableEnforceFocus
            open={true}
            {...props}
        >
            {children}
        </Dialog>
    )
}

export default Modal