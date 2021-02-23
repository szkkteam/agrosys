import convert from 'convert-units'
import { useIntl } from 'react-intl'

const unit = {narrow: 'ha', long: 'hectare'}

export default (areaM2) => {
    const intl = useIntl()

    const areaUnit = convert(areaM2).from('m2').to(unit.narrow)

    // TODO: Hectare not working ... ugly workaround
    return `${intl.formatNumber(areaUnit.toFixed(2), {unit: unit.long, style: 'unit', unitDisplay: 'narrow'})} ha`
}