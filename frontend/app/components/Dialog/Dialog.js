import React from 'react'
import MuiDialog from '@material-ui/core/Dialog';

import SimpleHeader from './SimpleHeader'
import FullHeader from './FullHeader'
import BackButton from './BackButton'
import CloseButton from './CloseButton'
import Content from './Content'
import Footer from './Footer'

import useContext from './hooks/useContext'

const Dialog = ({
    children,
    ...props
}) => {

    return (
        <MuiDialog
            //TODO: This is mandatory, if the modal has focustrap element.
            disableEnforceFocus
            open={true}
            {...props}
        >
            {children}
        </MuiDialog>
    )
}

Dialog.SimpleHeader = SimpleHeader
Dialog.FullHeader = FullHeader
Dialog.BackButton = BackButton
Dialog.CloseButton = CloseButton
Dialog.Content = Content
Dialog.Footer = Footer

Dialog.useContext = useContext

export default Dialog