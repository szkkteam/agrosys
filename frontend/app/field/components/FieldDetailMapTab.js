import React from 'react'
import Grid from '@material-ui/core/Grid';
import { ROUTES, ROUTE_MAP } from 'routes'
import { withRouter } from "react-router";

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'

import { 
    mapEvents,
    mapEventActionsTypes,
} from 'components/Map/actions'
import { selectMap } from 'components/Map/reducer'

import { 
    SplitPane,
    FieldDetailMap,
    FieldDetailCarousel,
    FieldDetailMapControl,
    FormFieldDetailDraw,
    FormFieldDetailUpdate,
} from 'field/components'

import { 
    MapEditFeature,
} from 'components/Map/components'

class FieldDetailMapTab extends React.Component {

    static defaultProps = {
        enableDrawing: false,
      }

    constructor(props) {
        super(props)

        this.state = {
            isAddNewDetail: false,
            enableDrawing: this.props.enableDrawing,
            featureInEdit: null,
        }
    }

    componentWillMount() {
        const { listFields } = this.props
        listFields.maybeTrigger()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field !== this.props.field) {
            this.setState({
                isAddNewDetail: false,
                enableDrawing: this.props.enableDrawing,
                featureInEdit: null,
            })
        }
    }

    onMouseHover = (field, e) => {
        //console.log("Highlight: ", field)
    }

    
    onClickFeature = (field, e) => {
        if (!this.state.enableDrawing) {
            this.props.history.push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field))
        }                
    }

    
    /**
     * Map control event handlers
     */
    onClickEdit = (e) => {
        this.setState({
            enableDrawing: true
        })
    }

    onClickFinish = () => {
        //console.log("onClickFinish")
        const { listFields, onRefreshPage } = this.props
        /*
        let newFeature = this.state.selectedFieldDetail
            newFeature.shape = this.state.featureInEdit.shape
            newFeature.area = this.state.featureInEdit.area
        this.setState({
            enableDrawing: false,
            isAddNewDetail: false,
            selectedFieldDetail: newFeature,
            featureInEdit: null,
        })
        */
        listFields.trigger()
        onRefreshPage && onRefreshPage()
    }

    onClickCancel = (e) => {
        //console.log("onClickCancel")
        this.setState({
            enableDrawing: false,
            isAddNewDetail: false,
            featureInEdit: null
        })
        
    }


    onDetailAdd = () => {
        //console.log("onDetailAdd")
        //this.selectedFieldDetail = null
        this.setState({
            isAddNewDetail: true,
            enableDrawing: true,
        })
    }

    /**
     * Handler for the Feautre editing
     */
    onFeatureEdit = ({featureInEdit, bounds}) => {
        if (featureInEdit) {
            //console.log("onFeatureEdit: ", featureInEdit)
            this.setState({
                featureInEdit: featureInEdit
            })
        }
        
    }
 
    onFeatureAdd = ({bounds}) => {
        //console.log("onFeatureAdd: ", bounds)
        if (!this.state.featureInEdit) {
            this.flyToBounds(bounds)
        }

    }

    renderStaticFeature = (featureInEdit) => {
        return (
             <MapEditFeature key={`static-${featureInEdit.area}`}
                    featureInEdit={featureInEdit.shape}
                    onAdd={this.onFeatureAdd}
                />
        )
    }

    renderEditableFeature = (featureInEdit) => {
        return (
            <MapEditFeature key={`editable-${featureInEdit.area}`}
                featureInEdit={featureInEdit.shape}
                enableEdit={true}
                onEdit={this.onFeatureEdit}
                onAdd={this.onFeatureAdd}
        />
        )
    }

    renderDrawableFeature = () => {
        return (
            <MapEditFeature key={`drawable`}
                    onEdit={this.onFeatureEdit}
                    onFinished={this.onFeatureEdit}
                />
        )
    }

    /**
     * Helper functions
     */
    getShapeAndArea = ({shape, area}) => {
        return {
            shape,
            area
        }
    }

    flyToBounds = (bounds) => {
        if (bounds) {
            const { mapEvents } = this.props
            mapEvents && mapEvents.addEvent({
                eventRequest: {
                    type: "fly-to-bounds",
                    config: {
                        bounds: bounds,
                    }
                }
            })
        }
    }

    render() {
        const { field, fieldList, onDetailSelected, selectedFieldDetail } = this.props
        const fields = fieldList.filter(el => el.id != field.id)
        const { isAddNewDetail, enableDrawing, featureInEdit } = this.state
        
        let feature = Object.assign({}, selectedFieldDetail);
        if (featureInEdit) {
            feature.shape = featureInEdit.shape
            feature.area = featureInEdit.area
        } else if (isAddNewDetail && !featureInEdit) {
            feature.shape = null
            feature.area = null
        }

        //console.log("Field: ", field)
        //console.log("Render selectedFieldDetail: ", selectedFieldDetail)

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
                            onClick={onDetailSelected}
                            onAdd={this.onDetailAdd}
                        />
                    </Grid> 
                    <Grid item xs={11}>
                        <FieldDetailMap
                            onClickFeature={this.onClickFeature}
                            onMouseHoverFeature={this.onMouseHover}
                            fields={fields}
                        >
                            <FieldDetailMapControl
                                onClickEdit={this.onClickEdit}
                                onClickCancel={this.onClickCancel}
                                menuOpen={enableDrawing}
                                form={
                                    isAddNewDetail?
                                    <FormFieldDetailDraw
                                        featureInEdit={feature}
                                        selectedId={field}
                                        onSubmitSuccess={this.onClickFinish}
                                    />   
                                    :
                                    <FormFieldDetailUpdate
                                        featureInEdit={feature}
                                        selectedId={feature}
                                        onSubmitSuccess={this.onClickFinish}
                                    />
                                }
                            />          
                            { !isAddNewDetail ? 
                                enableDrawing? 
                                this.renderEditableFeature(this.getShapeAndArea(feature))
                                : this.renderStaticFeature(this.getShapeAndArea(feature)) 
                                : this.renderDrawableFeature()
                            }
                        </FieldDetailMap>
                    </Grid>
                </Grid>
                <div>Feature in edit: {JSON.stringify(feature, null, 2)}</div>
            </SplitPane>
        )
    }
}

const withReducerFields = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))
const withReducerMap = injectReducer(require('components/Map/reducer'))

const withConnectFields = connect(
    (state) => ({fieldList: selectFieldsList(state)}),
    (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)

const withConnectMap = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreators({ mapEvents }, dispatch),
  )


export default compose(
    withSaga,
    withReducerFields,
    withReducerMap,
    withRouter,
    withConnectFields,
    withConnectMap,
)(FieldDetailMapTab)

