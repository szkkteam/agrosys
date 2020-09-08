import React from 'react'

import { ModalForm } from 'components/Form'
import { 
    FormSeason,
    SeasonParcelSelection,
} from 'season/components'

import {
    createSeason
} from 'season/actions'

export default class SeasonCreateContainer extends React.Component {

    render() {
        const { open, onClose } = this.props
        return (
            <ModalForm
                open={open}
                onClose={onClose}
                submitButtonProps={{
                    formName: "formSeason"
                }}
            >
                <FormSeason 
                    action={createSeason}
                    onSubmit={(e) => console.log("form submit: ", e)}
                />
                <SeasonParcelSelection
                />
            </ModalForm>
        )
    }
}