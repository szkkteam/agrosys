import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import FieldProductionCreateForm from '../FieldProductionCreateForm/FieldProductionCreateForm'

import { Modal, ModalContext } from 'components'

import { useCloseModalOnBack } from 'utils/hooks'


export default ({
    headerProps,
    data,
    ...props
}) => {

    const { handleConfirm } = useContext(ModalContext)

    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }

    const blocker = useCloseModalOnBack()

    return (
        <Modal
            fullWidth
            fullScreen={true}
            maxWidth="md"
        >   
             <FieldProductionCreateForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}
