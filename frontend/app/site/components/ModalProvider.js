import React, { useMemo } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'

import { popModalWindow } from 'redux-promising-modals';
import Dialog from '@material-ui/core/Dialog';
//import modalsMap from 'modals/modalsMap'

import * as modalResultTypes from '../modalResultTypes';
import { getModal } from '../selectors'

// Import modals
import { TestModal } from 'site/components'

import { 
    EDIT_FILE_DIALOG,
 } from '../modalTypes'

const ModalProvider = ({
    modalType,
    modalProps,
    popModalWindow,
    ...props
}) => {

    const modalsMap = useMemo( () => 
        new Map([
            [EDIT_FILE_DIALOG, TestModal],
            //[REMOVE_FILE_DIALOG, RemoveFileDialog]
    ]))
    const Component = modalsMap.get(modalType) || null;

    const onClose = () => {
        const { MODAL_TYPE_CANCEL } = modalResultTypes
        popModalWindow({status: MODAL_TYPE_CANCEL})
    }

    return (
        <React.Fragment>
            { Component && 
            <Component
                
                headerProps={{
                    open: true,
                    onClose: onClose,
                }}
                {...modalProps}
                resultTypes={modalResultTypes}
                popModalWindow={popModalWindow}
            /> }  
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const modal = getModal(state)
    return {
        ...modal,
    }
  }
  
  
  const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({ popModalWindow }, dispatch),
  )
  
  export default compose(
    withConnect,
  )(ModalProvider)