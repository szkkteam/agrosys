import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { 
    TableLayout
} from 'farmApp/components'

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import FieldMasterDetail from '../FieldMasterDetail/FieldMasterDetail'


const defaultViews = [
    {value: VIEW_MAP, icon: MapIcon, component: FieldMasterDetail},
    {value: VIEW_LIST, icon: ListIcon, component: FieldMasterDetail},
    {value: VIEW_MODULE, icon: ViewModuleIcon, component: FieldMasterDetail},
]

const FieldLayoutRouter = ({
    views=defaultViews,
    children,
    ...props
}) => {


    return (
        <TableLayout
            title="Agricultural parcels"
            views={views}
        />        
    )
}

/*
<FieldSummaryStats />
*/

FieldLayoutRouter.propTypes = {
    viewComponents: PropTypes.object
}

export default FieldLayoutRouter