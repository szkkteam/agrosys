import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    MasterDetail,
    SideSheet,
} from 'components'

import { LeafletMap } from 'components/Map/components'

import { FieldMasterList } from 'farmApp/resource/field/components'

import FieldProductionSideDetail from '../FieldProductionSideDetail/FieldProductionSideDetail'

const FieldProductionMasterDetail = ({
    
}) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (data) => {
        setSelected(!!selected? null : {id: 1})
    }

    const handleClose = () => {
        setSelected(null)
    }

    return (
        <MasterDetail
        >
            <FieldMasterList
                onSelect={handleSelect}
            />            
            <SideSheet
                open={!!selected}
            >
                <LeafletMap />
                <FieldProductionSideDetail
                    onClose={handleClose}
                />
            </SideSheet>
        </MasterDetail>
    )
}


FieldProductionMasterDetail.propTypes = {

}

export default FieldProductionMasterDetail