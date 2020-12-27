import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

//import { ProductionLayout } from '../../components'

const Container = styled.div`
    height: 100%;
`

export default ({    
    ...props
}) => {

    const intl = useIntl()
   
    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>
                Crop overview. Show quick stats about crops and running productions.<br/>
                Add possibility to create crop, or create production directly under specifc crop or create inline crop for it.<br/>
                Also manage the seasons?<br/>
            </div>
        </Container>
    )
}
