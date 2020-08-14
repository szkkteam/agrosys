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
    //console.log("List: ", list)
    //console.log("data: ", data)
    //console.log("findData: ", findData)
            /*
        this.setState(({items}) => ({
            items: [
                ...items.slice(0,1),
                {
                    ...items[1],
                    name: 'newName',
                },
                ...items.slice(2)
            ]
        }));
        */
    let items = [...list]
    let currentIdx = findTaskIdInlist(items, (findData === null || findData === undefined)? data: findData)
    let current = {...items[currentIdx]}
    // Update each element
    for (const [key, value] of Object.entries(data)) {
        current[key] = value
      }
    items[currentIdx] = current
    return items
}

const TestTasks =  [
    {
        id: 1,
        startDate: moment().toDate(),
        endDate: moment().add(1, "days").toDate(),
        title: "Task for pruning",
        taskType: 'TaskPruning',
        description: "Some random text for this task",
        status: "Pending",
        predictedCost: 1234,
    },
    {
        id: 2,
        startDate: moment().add(3, "days").toDate(),
        endDate: moment().add(5, "days").toDate(),
        title: "Typical generic task",
        taskType: 'TaskGeneral',
        description: "Some random text for this task",
        status: "Pending",
        predictedCost: 6789,
    },
]

class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        assignedFieldDetails: [],
            cropSelection: { 
                cropBaseId: null,
                cropVariantId: null,
                cropCultivationTypeId: null
            },
            cropTemplateId: null,
            tasks: TestTasks // TODO: Fixme
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
            }, this.persistState)
        }

                /** TODO:
         * 1) Clear the storage
         * 2) Load Production X 
         * 3) Store state in the storage
         */

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
        // TODO: If it's dirty popup a message
        loadProductionDetail && loadProductionDetail.trigger({payload: {id}})
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
        this.persistState()
        /** TODO:
         * 1) Clear the storage
         * 3) Store state in the storage
         */
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
        this.setState({
            tasks: updateListElements(this.state.tasks, newData, oldData),
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