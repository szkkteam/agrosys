import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindRoutineCreators } from 'actions'

import { AddParcelButton } from 'parcel/components'
import { getAddParcelButtons } from 'parcel/selectors'
import { withReducerParcelDetails } from 'parcel/injectors'
import { withReducerMap } from 'components/Map/injectors'
import { mapEdit } from 'components/Map/actions'


const AddParcelButtonContainer = ({
    buttons,
    mapEdit,
    ...rest
}) => {

    const onClick = (e, v) => {
        if ('initialValues' in v) {
            handleAddDirectParcel(v)
        }
    }

    const handleAddDirectParcel = ({initialValues}) => {
        mapEdit && mapEdit.add({initialValues})
    }

    return (
        <React.Fragment>
            {buttons && buttons.length &&
            <AddParcelButton 
                buttons={buttons}
                onClick={onClick}
                {...rest}
            /> }
        </React.Fragment>
    )
}

const mapStateToProps = state => (
        {buttons: getAddParcelButtons(state) }
)

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ mapEdit }, dispatch),
)

export default compose(
    withReducerMap,
    withReducerParcelDetails,
    withConnect,
)(AddParcelButtonContainer)

