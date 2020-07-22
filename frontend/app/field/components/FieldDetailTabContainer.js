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

        this.state = {
            isAddNewDetail: false,
            selectedFieldDetail: this.props.field.fields[this.props.field.fields.length - 1]
        }
    }

    componentWillMount() {
        const { listFields } = this.props
        listFields.maybeTrigger()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field !== this.props.field) {
            this.setState({
                selectedFieldDetail: nextProps.field.fields[nextProps.field.fields.length - 1]
            })
        }
    }

    onClickFeature = (field, e) => {
        this.props.history.push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field))
        
    }

    onDetailSelected = (fieldDetail) => {
        console.log("fieldDetail: ", fieldDetail)
        this.setState({
            selectedFieldDetail: fieldDetail,
        })
    }

    onDetailAdd = () => {
        console.log("onDetailAdd")
        //this.selectedFieldDetail = null
        this.setState({
            isAddNewDetail: true,
        })
    }

    onEditFinished = ({featureInEdit}) => {
        console.log("onEditFinished: ", featureInEdit)
        if (featureInEdit) {
            let newFeature = this.state.selectedFieldDetail
            newFeature.shape = featureInEdit.shape
            newFeature.area = featureInEdit.area
            this.setState({
                selectedFieldDetail: newFeature,
            })
        }
    }

    getShapeAndArea = ({shape, area}) => {
        return {
            shape,
            area
        }
    }

    render() {
        const { field, fieldList } = this.props
        const fields = fieldList.filter(el => el.id != field.id)
        
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
                            onClick={this.onDetailSelected}
                            onAdd={this.onDetailAdd}
                        />
                    </Grid> 
                    <Grid item xs={11}>
                        <FieldDetailMap
                            onClickFeature={this.onClickFeature}
                            onEditFinished={this.onEditFinished}
                            featureInEdit={this.getShapeAndArea(this.state.selectedFieldDetail)}
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