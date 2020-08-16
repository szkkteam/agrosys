import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { submit, isValid, isPristine, isSubmitting } from 'redux-form';

const SubmitButton = ({ dispatch, valid, pristine, submitting, formName, children, onClick, ...props }) => (
  <Button    
    {...props}
    disabled={!valid || pristine || submitting}
    color="primary"
    onClick={(e) => {
      var res = dispatch(submit(formName))
      onClick && onClick(e)
      return res
    }}
  >
    {children}
  </Button>
)

  


export default connect(
  (state, props) => ({
    valid: isValid(props.formName)(state),
    submitting: isSubmitting(props.formName)(state),
    pristine: isPristine(props.formName)(state),    
  })
)(SubmitButton)
