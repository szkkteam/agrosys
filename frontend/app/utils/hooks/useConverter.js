import convert from 'convert-units'
import { useIntl } from 'react-intl'

const unit = {narrow: 'ha', long: 'hectare'}
// TODO: Define more unit

const convertArea = (areaM2) => convert(areaM2).from('m2').to(unit.narrow)
const formatArea = (intl, areaUnit, fixed=2) => `${intl.formatNumber(areaUnit.toFixed(fixed), {unit: unit.long, style: 'unit', unitDisplay: 'narrow'})} ha`

export default () => {
    const intl = useIntl()

    return ({value, metric}, fixed=2) => {
        switch (metric) {
            case 'area': 
                return formatArea(intl, convertArea(value), fixed)
            default:
                return value
        }
    }
}