import React from 'react'

import { Modal } from 'site/components'
import DialogTitle from '@material-ui/core/DialogTitle';

import { defineMessages } from 'react-intl'

export const scope = 'test'

const messages = defineMessages({
    title: {
        id: `${scope}.title`,  
        defaultMessage: 'Tab X',
    },
  })

import { Detail, DetailContainer } from 'farmApp/components/Detail'

const Tab1 = () => <div>Tab 1</div>
const Tab2 = () => <div>Tab 2</div>

/**
<Modal>
    <form>
        <Detail
            headerProps={{...}}
            footerProps={{...}}
            tabs=[{title: 'Tab1', component: Tab1}]
        >
        </Detail>
    </form>
</Modal>
 */

export default ({
    headerProps,
    ...props
}) => {

    const tabs = [
        {label: messages.title, value: 0, component: Tab1},
        {label: messages.title, value: 1, component: Tab2},
    ]

    return (
        <Modal
            fullWidth
            maxWidth="md"
            {...headerProps}
        >
            <Detail
                headerProps={{
                    title: "Test title",
                    onClose: () => console.debug("Close")
                }}
                height={400}
                tabs={tabs}
            >
            </Detail>
            
        </Modal>
    )
}