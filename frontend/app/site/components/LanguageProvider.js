import React from 'react'
import { IntlProvider } from 'react-intl'

import { compose } from 'redux'
import { connect } from 'react-redux';
import { getSelectedLocale } from '../selectors'

const LanguageProvider = ({
    locale,
    messages,
    children,
}) => {
    const isDev = process.env.NODE_ENV !== 'production'
    const errorHandlerProp = isDev? { onError: () => null } : {}

    console.log("localized messages: ", messages[locale])
    return (
        <IntlProvider
            locale={locale}
            key={locale}
            messages={messages[locale]}
            {...errorHandlerProp}
            //onError={(e) => null}
        >
            {React.Children.only(children)}
        </IntlProvider>
    )
}

const mapStateToProps = (state) => {
    const locale = getSelectedLocale(state)
    return {
        locale,
    }
  }
  
  
  const withConnect = connect(
    mapStateToProps,
    null,
  )
  
  export default compose(
    withConnect,
  )(LanguageProvider)