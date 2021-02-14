#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_login import current_user
from flask_security.forms import (
    Form,
    EqualTo,
    Length,
    PasswordField,
    PasswordFormMixin,
    password_required,
    RegisterForm,
    get_form_field_label,
    email_required,
    email_validator,
    unique_user_email
)
from wtforms import (
	StringField,
	BooleanField
)
from wtforms.validators import DataRequired
from flask_security.utils import get_message, verify_and_update_password

# Internal package imports
from .models import user

password_length = Length(min=8, max=128,
                         message='Password must be at least 8 characters long.')


class ChangePasswordFormMixin(object):
    newPassword = PasswordField(
        'New Password',
        validators=[password_required, password_length]
    )

    confirmNewPassword = PasswordField(
        'Confirm New Password',
        validators=[password_required,
                    EqualTo('newPassword', message='RETYPE_PASSWORD_MISMATCH')]
    )


class ChangePasswordForm(Form, PasswordFormMixin, ChangePasswordFormMixin):
    def validate(self):
        if not super().validate():
            return False

        if not verify_and_update_password(self.password.data, current_user):
            self.password.errors.append(get_message('INVALID_PASSWORD')[0])
            return False
        if self.password.data == self.newPassword.data:
            self.newPassword.errors.append(get_message('PASSWORD_IS_THE_SAME')[0])
            return False
        return True

class ExtendedRegisterForm(RegisterForm):
    """
    Add user_mail field to the register's class
    """
    user_mail = StringField(get_form_field_label('email'),
        validators=[email_required, email_validator, unique_user_email])

    # TODO: Maybe the validate method is not needed now?
    """
    def validate(self):
        # Use standart validator
        validation = Form.validate(self)
        if not validation:
            return False
         
        # Check if mail address already exists       
        mail = user.query.filter_by(
            email=self.user_mail.data).first()
        if mail is not None:
            # Text displayed to the user
            self.user_mail.errors.append('E-mail address already exists')
            return False
            
        return True
    """

class ResetPasswordForm(Form, ChangePasswordFormMixin):
    pass