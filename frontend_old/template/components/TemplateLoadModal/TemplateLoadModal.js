import React from 'react'

import Button from '@material-ui/core/Button';
import { ModalForm } from 'components/Form'

import './templateloadmodal.scss'

export default ({
    open,
    onLoad,
    onClose,
    children,
}) => {
    console.log("Open: ", open)
    return (
        <ModalForm
            open={open}
            fullWidth={true}
            maxWidth="sm"
            title="Load template"
            customDialogActions={() => (
                <div>
                    <Button 
                        onClick={onClose} 
                        color="primary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="primary"
                        variant="contained"
                        onClick={onLoad} 
                    >
                        Load
                    </Button>
                </div>
            )}
        >
            {children}
        </ModalForm>
    )
}
    
