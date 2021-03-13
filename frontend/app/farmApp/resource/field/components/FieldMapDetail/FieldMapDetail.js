import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MASTER_DETAIL_BREAKPOINT } from 'farmApp/constants'

import { MapContainer, MapControlGeoSearch } from 'farmApp/map/components'

const FieldMapDetail = ({
    
}) => {

  
    return (
        <MapContainer
            controls={
                <>
                    <MapControlGeoSearch />
                </>
            }
        />
    )
}
/*
<FieldSideDetail
                    onClose={handleClose}
                />
*/

FieldMapDetail.propTypes = {

}

export default FieldMapDetail