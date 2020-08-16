import React from 'react'
import moment from "moment";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Prompt } from 'react-router'

import { bindRoutineCreators, bindRoutineCreatorsAction } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'
import { selectProductionTemplate } from 'production/reducers/productionDetail'
import { 
    createProductions,
    loadProductionDetail,
    productionTemplate,
    productionTemplateActionTypes,
} from 'production/actions'


import { CropTemplateContainer } from 'crop/components'
import { 
    FormProductionCreate,
    ProductionFieldAssigment,
    ProductionTaskContainer
} from 'production/components'

import {
    SubmitButton,
} from 'components/Form'

import { storage } from 'utils'

import {
    tasksToString,
    tasksFromString
} from 'production/utils'

const findTaskIdInlist = (list, data) => {
    return list.findIndex(e => e.id == data.id
        //console.log("e: ", e)
        //return e.startDate == data.startDate && e.endDate == data.endDate && e.title == data.title
    )
}

const updateListElements = (list, data, findData = null) => {
    let items = [...list]
    let currentIdx = findTaskIdInlist(items, (findData === null || findData === undefined)? data: findData)
    /*
    let current = {...items[currentIdx]}
    Object.keys(data).map((key, idx) => {
        current[key] = data[key]
    })
    */    
    items[currentIdx] = data
    return items
}

const deleteListElements = (list, oldDdata) => {
    let items = [...list]
    let currentIdx = findTaskIdInlist(items, oldDdata)
    return items.splice(currentIdx, 1);
}


class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        assignedFieldDetails: [],
            cropSelection: { 
                cropBaseId: null,
                cropVariantId: null,
                cropCultivationTypeId: null
            },
            cropTemplateId: null,
            tasks: []
    }
    constructor(props) {
        super(props)
        const { 
            assignedFieldDetails,
            cropSelection,
            cropTemplateId,
            tasks,
        } = props

        const enable = cropTemplateId? true: false

        this.state = {
            assignedFieldDetails: assignedFieldDetails,
            cropSelection: {
                cropBaseId: cropSelection.cropBaseId,
                cropVariantId: cropSelection.cropVariantId,
                cropCultivationTypeId: cropSelection.cropCultivationTypeId,
            },
            cropTemplateId: cropTemplateId,
            tasks: tasks,
            id: tasks.length? tasks[tasks.length -1].id + 1 : 1,
            dirty: false,
            enable: enable,
        }
    }


    componentDidMount = () => {
        this.props.listFields && this.props.listFields.maybeTrigger()
        
    }

    componentDidUpdate = (prevProps, prevState) => {
        const isDev = process.env.NODE_ENV !== 'production'
        const { dirty } = this.state
        if (dirty && !isDev) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
        if ((!prevProps.selectedTemplate && this.props.selectedTemplate ) ||
            (prevProps.selectedTemplate && this.props.selectedTemplate && prevProps.selectedTemplate.id != this.props.selectedTemplate.id)) {
            storage.clearProductionForm()
            const { fieldDetails: assignedFieldDetails, cropTemplateId, tasks = [] } = this.props.selectedTemplate
            this.setState({
                assignedFieldDetails,
                cropTemplateId,
                tasks: tasksFromString(tasks),
                id: tasks.length? tasks[tasks.length -1].id + 1 : 1,
                enable: true,
                dirty: false,
            }, this.persistState)
        }
    } 

    persistState = () => {
        const { assignedFieldDetails, cropSelection, cropTemplateId, tasks } = this.state
        storage.clearProductionForm()
        storage.storeProductionForm({
            assignedFieldDetails,
            cropSelection,
            cropTemplateId,
            tasks,
        })
    }

    onTemplateSelected = ({cropTemplateId, cropBaseId, cropVariantId, cropCultivationTypeId}) => {
        this.setState( prevState => ({
            ...prevState,
            cropTemplateId,
            cropSelection: {
                ...prevState.cropSelection,
                cropBaseId,
                cropVariantId,
                cropCultivationTypeId,
            },
        }))
    }

    onProductionSelected = (id) => {
        const { loadProductionDetail } = this.props
        const { dirty } = this.state
        const confirmed = dirty? window.confirm("Are you sure you want drop all of your changes?"): true
        confirmed && loadProductionDetail && loadProductionDetail.trigger({payload: {id}})
    }

    onCropSelected = () => {
        const { productionTemplate } = this.props
        const { cropTemplateId } = this.state
        if (cropTemplateId) {
            productionTemplate.clear()
            this.setState({
                enable: false
            })
        }
    }

    onNewProductionAdded = (value) => {
        this.setState({
            assignedFieldDetails: [],
            tasks: [],
            id: 1,
            enable: true,
            dirty: false,
        }, this.persistState)
    }

    onFieldClick = (fieldDetail) => {
        const { assignedFieldDetails } = this.state
        if (!assignedFieldDetails.find(e => e.id == fieldDetail.id)) {
            this.setState({
                assignedFieldDetails: [...this.state.assignedFieldDetails, fieldDetail],
                dirty: true,
            })           
        } else {
            this.setState({
                assignedFieldDetails: this.state.assignedFieldDetails.filter(e => e.id != fieldDetail.id),
                dirty: true,
            }) 
        }
    }

    onTaskSelect = (data) => {
        console.log("Selected: ", data)
    }

    onTaskUpdate = (newData, oldData) => {
        console.log("New data: ", newData)
        this.setState({
            tasks: updateListElements(this.state.tasks, newData, oldData),
            dirty: true,
        }, this.persistState)
    }

    onTaskDelete = (oldData) => {
        this.setState({
            tasks: deleteListElements(this.state.tasks, oldData),
            dirty: true,
        }, this.persistState)
    }

    onTaskResize = (newData, oldData) => {
        this.setState({
            tasks: updateListElements(this.state.tasks, newData, oldData),
            dirty: true,
        }, this.persistState)
    }
    
    onTaskDragNDrop = (newData, oldData) => {
        this.setState({
            tasks: updateListElements(this.state.tasks, newData, oldData),
            dirty: true,
        }, this.persistState)
    }

    onTaskAdded = (data) => {
        data["id"] = this.state.id
        this.setState({
             tasks: [...this.state.tasks, data], id: this.state.id + 1, 
             dirty: true,
        }, this.persistState)
    }

    render() {
        const { fields, useAsTemplate } = this.props
        const { 
            cropTemplateId,
            assignedFieldDetails,
            tasks,
            cropSelection: {
                cropBaseId,
                cropVariantId,
                cropCultivationTypeId,
            },         
            dirty,   
            enable,
        } = this.state

        const initialCropIds = {
            initialCropBaseId: cropBaseId,
            initialCropVariantId: cropVariantId,
            initialCropCultivationTypeId: cropCultivationTypeId,
        }
        
        return (
            <div>
                <Prompt
                    when={dirty}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
                <div>
                    <CropTemplateContainer
                        {...initialCropIds}
                        onSelection={this.onCropSelected}
                        onNewAdd={this.onNewProductionAdded}
                        onTemplateSelected={this.onTemplateSelected}
                        onProductionSelected={this.onProductionSelected}
                    />
                        
                </div>
                {enable && 
                    <div>
                        { !useAsTemplate && <ProductionFieldAssigment
                            fields={fields}
                            onSelect={this.onFieldClick}
                        /> }
                        <div>
                            { cropTemplateId && 
                                <FormProductionCreate
                                    onSubmit={createProductions}
                                    useAsTemplate={useAsTemplate}
                                    cropTemplateId={cropTemplateId}
                                    fieldDetails={assignedFieldDetails}
                                    tasks={tasksToString(tasks)}
                                /> 
                            }
                        </div>
                        <div>
                            <ProductionTaskContainer
                                tasks={tasks}
                                onTaskSelect={this.onTaskSelect}
                                onTaskUpdate={this.onTaskUpdate}
                                onTaskResize={this.onTaskResize}
                                onTaskDragNDrop={this.onTaskDragNDrop}
                                onTaskAdded={this.onTaskAdded}
                                onTaskDelete={this.onTaskDelete}

                            />
                        </div>
                        <div>
                            <SubmitButton 
                                variant="contained"
                                color="secondary"
                                formName="create-production"
                                onClick={() => this.setState({dirty: false})}
                            >
                                Save
                            </SubmitButton>
                        </div>
                    </div>
                }
            </div>
            
        )
    }
}


const withReducer = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))

const withSagaProductionDetail = injectSagas(require('production/sagas/productionDetail'))
const withReducerProductionTemplate = injectReducer(require('production/reducers/productionDetail'))

const withProductionsSagas = injectSagas(require('production/sagas/createProductions'))

const withConnect = connect(
  (state) => ({fields: selectFieldsList(state)}),
  (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)


const withConnectProductionTemplate = connect(
    (state) => ({selectedTemplate: selectProductionTemplate(state)}),
    (dispatch) => bindRoutineCreators({ loadProductionDetail }, dispatch),
  )
  

const withConnectTemplateClear = connect(
    (state) => ({selectedTemplate: selectProductionTemplate(state)}),
    (dispatch) => bindRoutineCreatorsAction({ productionTemplate }, dispatch, productionTemplateActionTypes),
)


const withStorage = WrappedComponent => (
    props => {
        const data = storage.getProductionForm()
        return (
            <WrappedComponent {...data} {...props}/>
        )
        
    }    
)

export default compose(
  withReducer,
  withReducerProductionTemplate,
  withSaga,
  withProductionsSagas,
  withSagaProductionDetail,
  withConnect,
  withConnectProductionTemplate,  
  withConnectTemplateClear,
  withStorage,
)(ProductionCreateContainer)