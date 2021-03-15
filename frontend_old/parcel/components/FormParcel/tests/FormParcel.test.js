import { normalizeArea } from 'utils/normalizer'
import { formatArea } from 'utils/formatter'
import { ExpansionPanelActions } from '@material-ui/core'

describe('FormParcel tests', () => {

    describe('area formatter-normalizer chain', () => {

        it('empty input', () => {
            const input = ''
            const format = formatArea('ha')
            const result = format(normalizeArea(input))
            //expect(result).toEqual(input)
            expect(input).toEqual('')
        })
    })
})