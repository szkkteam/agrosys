import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import ProductionCreateForm from '../ProductionCreateForm/ProductionCreateForm'

import { Modal, ModalContext } from 'components'


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
    return (
        <Modal
            fullWidth
            fullScreen={true}
            maxWidth="md"
        >   
             <ProductionCreateForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}
