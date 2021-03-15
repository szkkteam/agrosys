import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    chemicalFertilizer: Yup.bool(),
    chemicalSpraying: Yup.bool()
});
