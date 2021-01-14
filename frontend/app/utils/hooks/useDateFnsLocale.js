import React from 'react'
import { useLocale } from 'utils/hooks'

//import huLocale from "date-fns/locale/hu";
//import enLocale from "date-fns/locale/en-US";

const localeEnUs = 'en-US'
const localeHu = 'hu-HU'

const localeMap = {
    [localeHu]: 'en',
    [localeEnUs]: 'hu',
}

export default () => {
    const locale = useLocale() 
    return localeMap[locale]
}