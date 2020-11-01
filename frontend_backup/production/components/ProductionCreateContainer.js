import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { Spinner } from 'components/Loading'
import { Table } from 'components/Table'
import { FormTemplateLoad } from 'template/components'
import {
    convertM2ToHa,
} from 'utils/converter'

import {
    getSelectedParcelSeasons,
} from 'production/selectors'


class ProductionCreateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
        }
    }

    render() {
        const { parcelSeasons } = this.props

        console.log("data: ", this.state.data)
        return (
            <Table
                columns={[
                    { 
                        title: 'Production Title',
                        field: 'title',
                        //filtering: false,
                        //search: false,
                    },
                    {
                        title: 'Plan Title',
                        field: 'plan.title',
                        //render: (rowData) => <span>{rowData.season.title}</span>,
                        editComponent: ({value, onChange}) => {
                            return (
                              <FormTemplateLoad                                
                                onChange={onChange}
                              />                              
                            )
                          },
                    },
                ]}
                emptyRowsWhenPaging={false}
                data={this.state.data} 
                style={{overflowX: "hidden"}}             
                options={{
                    //pageSize: parcelSeasons.length,
                    doubleHorizontalScroll: true,
                    headerStyle: { position: 'sticky', top: 0 }, // Sticky on header is not working ...
                    maxBodyHeight: '650px',
                    search: false,
                }}
                editable={{                
                    onRowUpdate: (newData, oldData) => 
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log("newData: ", newData)
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log("newData: ", newData)
                                resolve()
                            }, 1000)
                        }),
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                this.setState({
                                    data: this.state.data.concat([newData])
                                })
                                console.log("newData: ", newData)
                                resolve()
                            }, 1000)
                        }),                    
                }}
                onBulkEditRowChanged={(e) => console.log("onBulkEditRowChanged: ", e)}
                components={{
                    Pagination: props => null,
                    //Toolbar: props => null,
                    //Header: props => (<thead><tr><th>Header</th></tr></thead>),
                    //...components,
                }}
                //{...props}
            />   
        )
    }
}


const mapStateToProps = (state) => {
    const { data: parcelSeasons, ...rest } = getSelectedParcelSeasons(state)
    return {
        parcelSeasons,
        ...rest,
    }
}

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ }, dispatch),
)


export default compose(    
    withConnect,
)(ProductionCreateContainer)