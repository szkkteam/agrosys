import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { Modal } from 'site/components'
import { Detail, DetailContainer } from 'farmApp/components/Detail'
import ProductionTabGeneral from './ProductionTabGeneral'

const Tab1 = () => <div>
    Create helper text.<br/>
    Create an autoselect button where the user can select a template<br/>
    Create a button, where the user can create a new template -> this will open the template manager<br/>
    Display a short summary from the selected template<br/>

</div>

const Container = styled.div`
    padding: 10px 15px;
`

const ProductionPlanSelectorDialog = ({
    data,
    onClose,
    ...props
}) => {
    //console.debug("headerProps: ", headerProps)
    console.debug("Props: ", props)

    return (
        <Detail
            title={messages.title}
            onClose={onClose}
        >
            <Container>
                <ProductionTabGeneral 
                    title={messages.tabGeneral}
                    {...props}
                />
            </Container>
        </Detail>
    )
}

ProductionPlanSelectorDialog.propTypes = {

}

export default ProductionPlanSelectorDialog