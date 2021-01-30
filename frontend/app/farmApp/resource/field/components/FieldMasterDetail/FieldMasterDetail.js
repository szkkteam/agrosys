import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MASTER_DETAIL_BREAKPOINT } from 'farmApp/constants'

import { 
    MasterDetail,
    SideSheet,
} from 'components'

import { MapContainer, MapControlGeoSearch } from 'farmApp/map/components'

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

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up(MASTER_DETAIL_BREAKPOINT));

    return (
        <MasterDetail
        >
            <FieldMasterList
                onSelect={handleSelect}
            /> 
            {isLarge &&
                <MapContainer
                    controls={
                        <>
                            <MapControlGeoSearch />
                        </>
                    }
                />
            }
                     
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