import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    cropType: Yup.string()
      .required(globalMessages.validationRequired)
});
