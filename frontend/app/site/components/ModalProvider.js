import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import { useSelector } from 'react-redux'
import ModalContext from 'components/Dialog/Context'

import { popModalWindow } from 'redux-promising-modals';
import Dialog from '@material-ui/core/Dialog';
//import modalsMap from 'modals/modalsMap'

import * as modalResultTypes from '../modalResultTypes';
import { getModal, isModalActive } from '../selectors'

// Import modals
import { TestModal } from 'site/components'
import { FarmPickOnMap } from 'farmApp/resource/farm/components'
import { FieldDrawDialog, FieldCreateDialog } from 'farmApp/resource/field/components'
import { MachineryForm } from 'farmApp/resource/machinery/components'
import { FieldPlanSeasonSelectDialog } from 'farmApp/plan/fieldPlan/components'
//import { OperationTreatmentDialog } from 'farmApp/operation/components'


import { 
    EDIT_FILE_DIALOG,
    FARM_PICK_ON_MAP_DIALOG,
    FIELD_CREATE_DIALOG,
    BLOCK_DRAW_DIALOG,
    FIELD_DRAW_DIALOG,
    MACHINERY_DIALOG,
    FIELD_PLAN_SEASON_SELECT,
    OPERATION_TREATMENT_DIALOG,

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
            [FIELD_CREATE_DIALOG, FieldCreateDialog],
            [FIELD_DRAW_DIALOG, FieldDrawDialog],
            [MACHINERY_DIALOG, MachineryForm],
            [FIELD_PLAN_SEASON_SELECT, FieldPlanSeasonSelectDialog],
            //[OPERATION_TREATMENT_DIALOG, OperationTreatmentDialog],
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

    const contextObject = {
        open: true,
        handleCancel,
        handleConfirm,
        handleAction,
    }

    return (
        <React.Fragment>
            <ModalContext.Provider value={contextObject}>
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
            </ModalContext.Provider>
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