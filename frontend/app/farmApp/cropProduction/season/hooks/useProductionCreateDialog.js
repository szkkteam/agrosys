import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Switch } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'


import { PRODUCTION_CREATE_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (success) => {

    return usePushDialog(PRODUCTION_CREATE_DIALOG, success)    
}
