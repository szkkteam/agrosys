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

import PlanAddParcelButton from '../../../PlanAddParcelButton'

const variants = [
    {id: 1, title: "ABONY", },
    {id: 2, title: "ACTIVUS", },
]


const CropVariantPage = ({
    data,
    children,
    ...props
}) => {
    const columns = [
        {title: 'Parcels', size: 1.5, render: (rowData) => <FieldListItem data={rowData} />},
        {title: 'Variant', render: (rowData) => <SearchSelectComponent name="cropType"
                                                    //label={intl.formatMessage(messages.cropType)}
                                                    label="Variant"
                                                    //variant="outlined"
                                                    disableClearable={true}
                                                    formProps={{fullWidth: true}}
                                                    options={variants}
                                                    //idAccessor={(o) => o.id}
                                                    groupBy={(option) => option.category}
                                                    getOptionLabel={(option) => option.title}
                                                />
        },
        {title: 'Planned yield' , render: (rowData) => <TextComponent name="cropType"
                                                            //label={intl.formatMessage(messages.cropType)}
                                                            label="Planned yield"
                                                            //variant="outlined"
                                                            formProps={{fullWidth: true}}
                                                            //idAccessor={(o) => o.id}
                                                        />
        },
        {title: 'Seed', render: (rowData) => <SearchSelectComponent name="cropType"
                                                //label={intl.formatMessage(messages.cropType)}
                                                label="Szaporítóanyag"
                                                //variant="outlined"
                                                disableClearable={true}
                                                formProps={{fullWidth: true}}
                                                options={variants}
                                                //idAccessor={(o) => o.id}
                                                groupBy={(option) => option.category}
                                                getOptionLabel={(option) => option.title}
                                            />
        },
        {title: 'Crop code', render: (rowData) => <SearchSelectComponent name="cropType"
                                                //label={intl.formatMessage(messages.cropType)}
                                                label="Crop code"
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
            <PlanAddParcelButton />
        </GridTable>
    )
}

CropVariantPage.propTypes = {

}

export default CropVariantPage