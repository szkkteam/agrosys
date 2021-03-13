import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { OPERATION_TREATMENT_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (success) => {
    
    return usePushDialog(OPERATION_TREATMENT_DIALOG, success)    
}
