import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { Spinner } from 'components/Loading'
import { Table } from 'components/Table'

import {
    convertM2ToHa,
} from 'utils/converter'

import {
    getSelectedParcelSeasons,
} from 'production/selectors'


class ProductionCreateContainer extends React.Component {

    render() {
        const { parcelSeasons } = this.props

        console.log("parcelSeasons: ", parcelSeasons)
        return (
            <Table
                columns={[
                    {
                        title: 'Season',
                        field: 'season.title',
                        defaultGroupOrder: 0,
                        //render: (rowData) => <span>{rowData.season.title}</span>,
                    },
                    { 
                        title: 'Title',
                        field: 'title',
                        //filtering: false,
                        //search: false,
                    },
                    {
                        title: 'Area',
                        field: 'totalArea',
                        render: (rowData) => <span>{convertM2ToHa(rowData.totalArea)} Ha</span>,
                        customSort: (a, b) => b.totalArea - a.totalArea 
                    }
                ]}
                emptyRowsWhenPaging={false}
                data={parcelSeasons} 
                style={{overflowX: "hidden"}}             
                options={{
                    grouping: true,
                    defaultExpanded: true,
                    //pageSize: parcelSeasons.length,
                    doubleHorizontalScroll: true,
                    headerStyle: { position: 'sticky', top: 0 }, // Sticky on header is not working ...
                    maxBodyHeight: '650px',
                    search: false,
                }}
                components={{
                    Pagination: props => null,
                    Groupbar: props => null,
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