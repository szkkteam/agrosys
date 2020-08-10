import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const SButton = ({ dispatch, formName, children, onClick }) => (
  <Button
    color="primary"
    onClick={(e) => dispatch(submit(formName))}
  >
    {children}
  </Button>
)

export default connect()(SButton)
