import React from 'react'
import moment from "moment";
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listFields } from 'field/actions'
import { selectFieldsList } from 'field/reducers/field'

import { CropTemplateContainer } from 'crop/components'
import { 
    FormProductionCreate,
    ProductionFieldAssigment,
    ProductionTaskContainer
} from 'production/components'

import { storage } from 'utils'


const findTaskIdInlist = (list, data) => {
    return list.findIndex(e => {
        //console.log("e: ", e)
        return e.startDate == data.startDate && e.endDate == data.endDate && e.title == data.title
    }
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
        startDate: moment().toDate(),
        endDate: moment().add(1, "days").toDate(),
        title: "Task for pruning",
        taskType: 'TaskPruning',
        description: "Some random text for this task",
        status: "Pending",
        plannedCost: 1234,
    },
    {
        startDate: moment().add(3, "days").toDate(),
        endDate: moment().add(5, "days").toDate(),
        title: "Typical generic task",
        taskType: 'TaskGeneral',
        description: "Some random text for this task",
        status: "Pending",
        plannedCost: 6789,
    },
]


class ProductionCreateContainer extends React.Component {

    static defaultProps = {
        
    }

    constructor(props) {
        super(props)

        const data = storage.getProductionForm()
        console.log("Data: ", data)
        const { 
            assignedFieldDetails = [],
            cropSelection: { 
                cropBaseId = null,
                cropVariantId = null,
                cropCultivationTypeId = null
            } = {},
            cropTemplateId = null,
            tasks = TestTasks // TODO: Fixme
        } = data

        this.state = {
            assignedFieldDetails: assignedFieldDetails,
            cropSelection: {
                cropBaseId: cropBaseId,
                cropVariantId: cropVariantId,
                cropCultivationTypeId: cropCultivationTypeId,
            },
            cropTemplateId: cropTemplateId,
            tasks: tasks,
            enableEdit: false,
        }
    }


    componentDidMount() {
        console.log("Did mount")
        this.props.listFields && this.props.listFields.maybeTrigger()
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

    onProductionSelected = (value) => {
        console.log("Production: ", value)
        /** TODO:
         * 1) Clear the storage
         * 2) Load Production X 
         * 3) Store state in the storage
         */
    }

    onNewProductionAdded = (value) => {
        const { assignedFieldDetails, cropSelection, cropTemplateId, tasks } = this.state
        console.log("onNewProductionAdded: ", value)
        storage.clearProductionForm()
        storage.storeProductionForm({
            assignedFieldDetails,
            cropSelection,
            cropTemplateId,
            tasks,
        })
        /** TODO:
         * 1) Clear the storage
         * 3) Store state in the storage
         */
    }

    onFieldClick = (fieldDetail) => {
        const { assignedFieldDetails } = this.state
        if (!assignedFieldDetails.find(e => e.id == fieldDetail.id)) {
            this.setState({
                assignedFieldDetails: [...this.state.assignedFieldDetails, fieldDetail]
            })           
        } else {
            this.setState({
                assignedFieldDetails: this.state.assignedFieldDetails.filter(e => e.id != fieldDetail.id)
            }) 
        }
    }

    onTaskUpdate = (newData, oldData) => {
        this.setState({tasks: updateListElements(this.state.tasks, newData, oldData)})
    }

    onTaskResize = (newData, oldData) => {
        this.setState({tasks: updateListElements(this.state.tasks, newData, oldData)})
    }
    
    onTaskDragNDrop = (newData, oldData) => {
        this.setState({tasks: updateListElements(this.state.tasks, newData, oldData)})
    }

    onTaskAdded = (data) => {
        console.log("Task created: ", data)
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
        } = this.state

        const initialCropIds = {
            initialCropBaseId: cropBaseId,
            initialCropVariantId: cropVariantId,
            initialCropCultivationTypeId: cropCultivationTypeId,
        }
        return (
            <div>
                <div>
                    <CropTemplateContainer
                        {...initialCropIds}
                        onNewAdd={this.onNewProductionAdded}
                        onTemplateSelected={this.onTemplateSelected}
                        onProductionSelected={this.onProductionSelected}
                    />
                        
                </div>
                { !useAsTemplate && <ProductionFieldAssigment
                    fields={fields}
                    onSelect={this.onFieldClick}
                /> }
                <div>
                    { cropTemplateId && 
                        <FormProductionCreate
                            useAsTemplate={useAsTemplate}
                            cropTemplateId={cropTemplateId}
                            fieldDetails={assignedFieldDetails}
                        /> 
                    }
                </div>
                <div>
                    <ProductionTaskContainer
                        tasks={tasks}
                        onTaskUpdate={this.onTaskUpdate}
                        onTaskResize={this.onTaskResize}
                        onTaskDragNDrop={this.onTaskDragNDrop}
                        onTaskAdded={this.onTaskAdded}

                    />
                </div>
            </div>
            
        )
    }
}


const withReducer = injectReducer(require('field/reducers/field'))
const withSaga = injectSagas(require('field/sagas/listFields'))

const withConnect = connect(
  (state) => ({fields: selectFieldsList(state)}),
  (dispatch) => bindRoutineCreators({ listFields }, dispatch),
)

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductionCreateContainer)