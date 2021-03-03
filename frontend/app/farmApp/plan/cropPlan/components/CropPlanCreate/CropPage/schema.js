import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    cropType: Yup.object().required(),
    expectedYield: Yup.number().required().moreThan(0),
    
});