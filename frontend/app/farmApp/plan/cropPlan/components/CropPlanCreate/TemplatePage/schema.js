import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    template: Yup.object().required(),
});