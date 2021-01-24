import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { 
    HiddenField,
    TextField,
    TextComponent,
    SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import { 
    PrimaryActionButton,
} from 'components'

import GridTable from 'farmApp/components/GridTable'

import DeleteIcon from '@material-ui/icons/Delete';

import {
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'

import FieldSnapshot from './FieldSnapshot'

const ownership = [
    {id: 1, title: "Tulajdon", },
    {id: 2, title: "Földhaszonbérlet", },
    {id: 3, title: "Szivességi földhasználat", },
    {id: 4, title: "Vagyonkezelő", },
    {id: 5, title: "Közeli hozzátartozó", },
    {id: 6, title: "Mindezek vegyesen", },
    {id: 7, title: "Egyéb", },
]

const FieldCreateGridView = ({
    onAddNew,
    onDeleteItem,
    fields,
    meta: { error, submitFailed },
    ...props
}) => {

    const handleDeleteItem = (index) => () => {
        onDeleteItem && onDeleteItem(index)
    }

    const handleAddNew = () => {
        onAddNew && onAddNew()
    }

    const columns = useMemo(() => [
        {title: 'Shape', size: 0.5, render: (field, i) => <FieldSnapshot />
        },
        {title: 'Title', render: (field, i) => <TextField name={`${field}.title`}
                                                    label="Title"
                                                    formProps={{fullWidth: true}}
                                                />
        },
        {title: 'Ownership', render: (field, i) => <SearchSelectField name={`${field}.ownership`}
                                                label="Ownership"
                                                disableClearable={true}
                                                formProps={{fullWidth: true}}
                                                options={ownership}
                                                //idAccessor={(o) => o.id}
                                                groupBy={(option) => option.category}
                                                getOptionLabel={(option) => option.title}
                                            />
        },
        {title: 'Cadastral plot' , render: (field, i) => <TextField name={`${field}.lpis.cadastralPlot`}
                                                            label="Cadastral plot"
                                                            formProps={{fullWidth: true}}
                                                        />
        },
        {title: 'MePAR block' , render: (field, i) => <TextField name={`${field}.lpis.mepar`}
                                                            label="MePAR block identifier"
                                                            formProps={{fullWidth: true}}
                                                            />
        },
        {title: '', size: "0 0 40px", spacing: 0, render: (data, index) => (
            <IconButton
                onClick={handleDeleteItem(index)}
            >
                <DeleteIcon />
            </IconButton>)
            }
        
    ], [fields])

    return (
        <GridTable
            columns={columns}
            data={fields}
            columnSpacing={3}
        >
            <PrimaryActionButton 
                title={messages.drawNew}
                onClick={handleAddNew}
            />
        </GridTable>
    )
}

FieldCreateGridView.propTypes = {

}

export default FieldCreateGridView
