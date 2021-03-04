import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'


import {
    Table,
} from 'farmApp/components'

const FieldPlanOverview = ({

}) => {


    return (
        <Table
            data={[
                {test: "test 1"},
                {test: "asd"},
                {test: "bbb"},
                {test: "cica"},
            ]}
            columns={[
                {
                    title: 'Test',
                    field: 'test'
                }
            ]}
            filterProps={{
                /*
                filters: [
                    {id: '1', title: 'filter 1'},
                    {id: '2', title: 'filter 2'},
                    {id: '3', title: 'filter 3'}
                ],
                */
                content: (
                    <div>content</div>
                )
            }}
        />
    )
}

FieldPlanOverview.propTypes = {

}

export default FieldPlanOverview