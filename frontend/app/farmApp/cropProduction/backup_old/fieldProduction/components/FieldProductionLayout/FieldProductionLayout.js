import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { FieldLayoutRouter } from 'farmApp/resource/field/components'
import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from 'farmApp/resource/field/constants'

import FieldProductionMasterDetail from '../FieldProductionMasterDetail/FieldProductionMasterDetail'
import FieldProductionSummaryStats from '../FieldProductionSummaryStats/FieldProductionSummaryStats'


const FieldProductionLayout = ({

}) => {
    
    const viewComponents = {
        [VIEW_MAP]: FieldProductionMasterDetail,
        [VIEW_LIST]: FieldProductionMasterDetail,
        [VIEW_MODULE]: FieldProductionMasterDetail
    }

    return (
        <FieldLayoutRouter
            viewComponents={viewComponents}
        >
            <FieldProductionSummaryStats
            />
        </FieldLayoutRouter>
    )
}

FieldProductionLayout.propTypes = {

}

export default FieldProductionLayout