import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    HiddenField,
    TextComponent,
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import GridTable from 'farmApp/components/GridTable'

import {
    FieldListItem
} from 'farmApp/production/field/components'

import DeleteIcon from '@material-ui/icons/Delete';

import {
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'


const variants = [
    {id: 1, title: "ABONY", },
    {id: 2, title: "ACTIVUS", },
]


const SubsidyPage = ({
    data,
    children,
    ...props
}) => {
    const columns = [
        {title: 'Parcels', size: 1.5, render: (rowData) => <FieldListItem data={rowData} />},
        {title: 'Table number', render: (rowData) => <TextComponent name="cropType"
                                                    //label={intl.formatMessage(messages.cropType)}
                                                    label="Table number"
                                                    //variant="outlined"
                                                    formProps={{fullWidth: true}}
                                                    //idAccessor={(o) => o.id}
                                                />
        },
        {title: 'AKG codes', render: (rowData) => <SearchSelectComponent name="cropType"
                                                        //label={intl.formatMessage(messages.cropType)}
                                                        label="AKG codes"
                                                        //variant="outlined"
                                                        disableClearable={true}
                                                        formProps={{fullWidth: true}}
                                                        options={variants}
                                                        //idAccessor={(o) => o.id}
                                                        groupBy={(option) => option.category}
                                                        getOptionLabel={(option) => option.title}
                                                    />
        },
        {title: 'KET/KAT', render: (rowData) => <TextComponent name="cropType"
                                                    //label={intl.formatMessage(messages.cropType)}
                                                    label="KAT/KET"
                                                    //variant="outlined"
                                                    formProps={{fullWidth: true}}
                                                    //idAccessor={(o) => o.id}
                                                />
        },
        {title: 'Subsidies', render: (rowData) => <SearchSelectComponent name="cropType"
                                                        //label={intl.formatMessage(messages.cropType)}
                                                        label="Subsidies"
                                                        //variant="outlined"
                                                        disableClearable={true}
                                                        formProps={{fullWidth: true}}
                                                        options={variants}
                                                        //idAccessor={(o) => o.id}
                                                        groupBy={(option) => option.category}
                                                        getOptionLabel={(option) => option.title}
                                                    />
        },
        {title: '', size: "0 0 40px", spacing: 0, render: () => (<IconButton>
            <DeleteIcon />
        </IconButton>)
        }
    ]

    return (
        <GridTable
            columns={columns}
            data={data}
            columnSpacing={3}
        >
            {children}
        </GridTable>
    )
}

SubsidyPage.propTypes = {

}

export default SubsidyPage