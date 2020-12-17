import React, { useEffect, useContext } from 'react'
import AppContext from 'components/AppContext'

export default (title) => {

    const { setPageTitle } = useContext(AppContext)
    useEffect(() => {
        setPageTitle(title)
    }, [])
}