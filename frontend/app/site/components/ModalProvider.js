import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { popModalWindow, clearModalWindows  } from 'redux-promising-modals';
import Dialog from '@material-ui/core/Dialog';
//import modalsMap from 'modals/modalsMap'

import * as modalResultTypes from '../modalResultTypes';
import { getModal, isModalActive } from '../selectors'

// Import modals
import { TestModal } from 'site/components'
import { FarmPickOnMap } from 'farmApp/farm/components'
import { BlockCreateModal } from 'farmApp/block/components'

import { 
    EDIT_FILE_DIALOG,
    FARM_PICK_ON_MAP_DIALOG,
    BLOCK_CREATE_DIALOG,
 } from '../modalTypes'

const ModalProvider = ({
    isActive,
    modalType,
    modalProps,
    popModalWindow,
    clearModalWindows,
    ...props
}) => {

    const modalsMap = useMemo( () => 
        new Map([
            [EDIT_FILE_DIALOG, TestModal],
            [FARM_PICK_ON_MAP_DIALOG, FarmPickOnMap],
            [BLOCK_CREATE_DIALOG, BlockCreateModal],
            //[REMOVE_FILE_DIALOG, RemoveFileDialog]
    ]))
    const Component = modalsMap.get(modalType) || null;

    const handleCancel = () => {
        const { MODAL_TYPE_CANCEL } = modalResultTypes
        popModalWindow({ status: MODAL_TYPE_CANCEL });
    }

    const handleConfirm = (payload) => {
        const { MODAL_TYPE_CONFIRM  } = modalResultTypes
        popModalWindow({ status: MODAL_TYPE_CONFIRM , payload });
    }

    const handleAction = (type, payload) => {
        popModalWindow({ status: type , payload });
    }
        
    const location = useLocation()

    useEffect(() => {
        isActive && clearModalWindows()
        // When location changed 
    }, [location])


    return (
        <React.Fragment>
            { Component && 
            <Component
                
                headerProps={{
                    open: true,
                    onClose: handleCancel,
                }}
                {...modalProps}
                resultTypes={modalResultTypes}
                popModalWindow={popModalWindow}
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
                handleAction={handleAction}
            /> }  
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const modal = getModal(state)
    const isActive = isModalActive(state)
    return {
        isActive,
        ...modal,
    }
  }
  

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({ popModalWindow, clearModalWindows  }, dispatch),
)

export default compose(
    withConnect,
)(ModalProvider)