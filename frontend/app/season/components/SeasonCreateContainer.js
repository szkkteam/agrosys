import React from 'react'

import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { ModalForm } from 'components/Form'
import { 
    FormSeason,
    SeasonParcelSelection,
} from 'season/components'

import {
    createSeason
} from 'season/actions'

import {
    convertReferenceParcels
} from 'season/utils'

class SeasonCreateContainer extends React.Component {
 
    constructor(props) {
        super(props)

        this.state = {
            selectedParcelsList: [],
        }        
    }

    onSelectParcels = (selectedList) => {
        this.setState({
            selectedParcelsList: _.take(selectedList, selectedList.length)
        })
    }

    render() {
        const { selectedParcelsList } = this.state
        const { open, onClose, onSave } = this.props
        return (
            <ModalForm
                open={open}
                onClose={onClose}
                submitButtonProps={{
                    formName: "formSeason"
                }}
            >
                <FormSeason 
                    //action={createSeason}
                    onSubmit={createSeason}
                    initialValues={{
                        referenceParcels: convertReferenceParcels(selectedParcelsList),
                    }}
                />
                <SeasonParcelSelection
                    onSelectionChange={this.onSelectParcels}
                />
            </ModalForm>
        )
    }
}


const withSagaCreate = injectSagas(require('season/sagas/createSeason'))


export default compose(
    withSagaCreate,
)(SeasonCreateContainer)