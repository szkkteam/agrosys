import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedLocale } from 'site/selectors'


export default () => {
    return useSelector(getSelectedLocale)
}