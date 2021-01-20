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

import FieldMasterList from '../FieldMasterList/FieldMasterList'

const FieldMasterDetail = ({
    
}) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (data) => {
        setSelected(!!selected? null : data)
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
                <div>Detail</div>
            </SideSheet>
        </MasterDetail>
    )
}
/*
<FieldSideDetail
                    onClose={handleClose}
                />
*/

FieldMasterDetail.propTypes = {

}

export default FieldMasterDetail