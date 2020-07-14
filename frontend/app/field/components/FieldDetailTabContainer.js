import React from 'react'
import Grid from '@material-ui/core/Grid';
import { ROUTES, ROUTE_MAP } from 'routes'
import { withRouter } from 'react-router-dom'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'

import { 
    SplitPane,
    FieldDetailMap,
    FieldDetailCarousel,
} from 'field/components'

class FieldDetailTabContainer extends React.Component {

    constructor(props) {
        super(props)

        this.selectedFieldDetail = this.props.field.fields[this.props.field.fields.length - 1]
    }

    componentWillMount() {
        const { listFields } = this.props
        listFields.maybeTrigger()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field !== this.props.field) {
            this.selectedFieldDetail = this.props.field.fields[this.props.field.fields.length - 1]
        }
    }

    onClickFeature = (field, e) => {
        this.props.history.push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field))
        
    }

    onDetailSelected = ({fieldDetail}) => {
        this.selectedFieldDetail = fieldDetail
    }



    onEditFinished = ({featureInEdit}) => {
        if (featureInEdit) {
            this.selectedFieldDetail.shape = featureInEdit
        }
    }

    render() {
        const { field, fieldList } = this.props
        const fields = fieldList.filter(el => el.id != field.id)
        // Feature in edit should be null, if new shape will be created
        const featureInEdit = {
            shape: this.selectedFieldDetail.shape,
            area: this.selectedFieldDetail.area,
        }
        return (
            <SplitPane
                leftSize={9}
                rightSize={3}
            >
                <Grid 
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                >
                    <Grid item xs={1}>
                        <FieldDetailCarousel
                            items={field.fields}
                        />
                    </Grid> 
                    <Grid item xs={11}>
                        <FieldDetailMap
                            onClickFeature={this.onClickFeature}
                            onEditFinished={this.onEditFinished}
                            featureInEdit={featureInEdit}
                            fields={fields}
                        />
                    </Grid>
                </Grid>
                <div>Field details pane</div>
            </SplitPane>
        )
    }
}

const withReducer = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))

const withConnect = connect(
    (state) => ({fieldList: selectFieldsList(state)}),
    (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)


export default compose(
    withSaga,
    withReducer,
    withRouter,
    withConnect,
)(FieldDetailTabContainer)