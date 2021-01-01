import React, { useRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from 'routes'
import { useRouteMap } from 'utils/hooks'

import {
    TextField
} from '@material-ui/core'

import {
    Autocomplete
} from '@material-ui/lab'


const options = [
    {id: 1, title: "Wheat 2018"},
    {id: 2, title: "Wheat 2019"},
    {id: 3, title: "Wheat 2020"},
]

const ProductionSeasonSelector = ({
    ...props
}) => {
    const intl = useIntl()
    const history = useHistory()
    const route = useRouteMap(ROUTES.ProductionDetail)
    const { cropId, productionId } = useParams()

    const [selected, setSelected] = useState(options.find(x => x.id == productionId))

    const handleChange = (e, v) => {
        setSelected(v)
        history.push(route.toPath({cropId, productionId: v.id}))
    }

    return (
        <Autocomplete
            id="grouped-demo"
            disableClearable={true}
            options={options}
            value={selected}
            getOptionLabel={(option) => option.title}
            onChange={handleChange}
            style={{ width: 220 }}
            renderInput={(params) => 
                <TextField 
                    {...params}
                    //label="Current season"
                    variant="outlined" 
                />
            }
            {...props}
        />
    )
}

ProductionSeasonSelector.propTypes = {
}

export default ProductionSeasonSelector
