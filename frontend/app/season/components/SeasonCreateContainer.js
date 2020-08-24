import React from 'react'

import { ModalForm } from 'components/Form'

export default class SeasonCreateContainer extends React.Component {

    render() {
        const { open, onClose } = this.props
        return (
            <ModalForm
                open={open}
                onClose={onClose}
            /> 
        )
    }
}