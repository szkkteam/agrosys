import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import { useSelector } from 'react-redux'

import { popModalWindow } from 'redux-promising-modals';
import Dialog from '@material-ui/core/Dialog';
//import modalsMap from 'modals/modalsMap'

import * as modalResultTypes from '../modalResultTypes';
import { getModal, isModalActive } from '../selectors'

// Import modals
import { TestModal } from 'site/components'
import { FarmPickOnMap } from 'farmApp/resource/farm/components'
import { BlockCreateModal, BlockDrawModal } from 'farmApp/resource/block/components'
import { FieldDrawModal } from 'farmApp/production/field/components'
import { MachineryForm } from 'farmApp/resource/machinery/components'
import { CropForm } from 'farmApp/production/crop/components'
import { ProductionPlanSelectorForm} from 'farmApp/production/production/components'

import { 
    EDIT_FILE_DIALOG,
    FARM_PICK_ON_MAP_DIALOG,
    BLOCK_CREATE_DIALOG,
    BLOCK_DRAW_DIALOG,
    FIELD_DRAW_DIALOG,
    MACHINERY_DIALOG,
    CROP_DIALOG,
    PRODUCTION_PLAN_SELECTOR_DIALOG,
 } from '../modalTypes'

const ModalProvider = ({
    isActive,
    modalType,
    modalProps,
    popModalWindow,
    ...props
}) => {

    const modalsMap = useMemo( () => 
        new Map([
            [EDIT_FILE_DIALOG, TestModal],
            [FARM_PICK_ON_MAP_DIALOG, FarmPickOnMap],
            [BLOCK_CREATE_DIALOG, BlockCreateModal],
            [BLOCK_DRAW_DIALOG, BlockDrawModal],
            [FIELD_DRAW_DIALOG, FieldDrawModal],
            [MACHINERY_DIALOG, MachineryForm],
            [CROP_DIALOG, CropForm],
            [PRODUCTION_PLAN_SELECTOR_DIALOG, ProductionPlanSelectorForm]
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
    (dispatch) => bindActionCreators({ popModalWindow }, dispatch),
)

export default compose(
    withConnect,
)(ModalProvider)