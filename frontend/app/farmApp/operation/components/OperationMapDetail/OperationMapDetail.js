import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { MapContainer, MapControlGeoSearch } from 'farmApp/map/components'

const OperationMapDetail = ({

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

OperationMapDetail.propTypes = {

}

export default OperationMapDetail