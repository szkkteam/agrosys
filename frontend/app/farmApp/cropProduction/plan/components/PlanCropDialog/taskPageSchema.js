import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    template: Yup.string()
      .required(globalMessages.validationRequired)
});
