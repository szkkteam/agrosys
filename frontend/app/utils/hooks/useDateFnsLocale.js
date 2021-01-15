import React from 'react'
import { useLocale } from 'utils/hooks'

import huLocale from "date-fns/locale/hu";
import enLocale from "date-fns/locale/en-US";

const localeEnUs = 'en-US'
const localeHu = 'hu-HU'

const localeMap = {
    [localeHu]: huLocale,
    [localeEnUs]: enLocale,
}

const maskMap = {
    [localeEnUs]: "__/__/____",
    [localeHu]: "____.__.__",
  };

export default () => {
    const locale = useLocale() 
    return {
        locale: localeMap[locale],
        mask: maskMap[locale]
    }
}