import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { mapEdit } from 'components/Map/actions'
import { selectMap } from 'components/Map/reducer'

import {
    EditParcelButton,
    FormParcel,
} from 'parcel/components'

import { 
    createParcel,
    updateParcel,
} from 'parcel/actions'

const MapEditButton = ({
    selectedParcel,
    selectedSeason,
    mapEdit,
    action,
    isEdit,
    initialValues,
    ...rest
}) => {

    const onEdit = () => {
        mapEdit && mapEdit.edit({
            initialValues: {...selectedParcel}
        })
    }

    const onCancel = () => {
        mapEdit && mapEdit.cancel()
    }

    const onSubmit = () => {
        mapEdit && mapEdit.submit()
    }

    return (
        <React.Fragment>
            { isEdit? 
                <FormParcel
                    action={action}
                    onCancel={onCancel}
                    onSubmitSuccess={onSubmit}
                    initialValues={{
                        ...initialValues,
                        parentSeason: selectedSeason,
                        parentParcel: selectedParcel,
                    }}
                />
                : selectedParcel ?
                    <EditParcelButton
                        title={selectedParcel.title}
                        onEdit={onEdit}
                    />
                : null                
            }
        </React.Fragment>                
    )
}


const mapStateToProps = (state) => {
    const mapState = selectMap(state)
    return ({
        isEdit: mapState.editData !== null,
        action: mapState.editData !== null? mapState.isEditing? updateParcel : createParcel : null,
        initialValues: mapState.editData,
        selectedParcel: null,
        selectedSeason: null,
    })
}

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ mapEdit }, dispatch),
)


export default compose(
    withConnect,
)(MapEditButton)