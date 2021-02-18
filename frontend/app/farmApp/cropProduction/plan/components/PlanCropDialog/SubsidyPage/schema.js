import * as Yup from 'yup';
import globalMessages from 'messages'

export default Yup.object().shape({    
    mainCrop: Yup.object().shape({
        cropType: Yup.object()
    })
});