import React, { useRef, useMemo, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    Dialog,
    Button,
} from 'components'


const Content = ({
    title,
    subheader,
    children,
    primaryButtonProps={},
    ...props
}) => {
    return (
        <>
            <Dialog.SimpleHeader
                title={title}
                subheader={subheader}
            >
                <Dialog.CloseButton />
            </Dialog.SimpleHeader>
            <Dialog.Content
                dividers
            >
                {children}
            </Dialog.Content>
            <Dialog.Footer
                py={3}
                px={2}
            >
                <Button 
                    color="primary"
                    {...primaryButtonProps}
                />
            </Dialog.Footer>
        </>
    )
}

const DialogCloseLayout = ({
    children,
    ...props
}) => {

    return (
        <Dialog
            fullWidth
            maxWidth="md"
        >   
            {children}
        </Dialog>
    )
}

DialogCloseLayout.propTypes = {
    
}

DialogCloseLayout.Content = Content

export default DialogCloseLayout