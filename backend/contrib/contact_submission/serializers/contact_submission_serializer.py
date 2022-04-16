#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import html
import re

# Pip package imports
from marshmallow import validate
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.api import ModelSerializer, pre_load, fields

from ..models import ContactSubmission

not_blank = validate.Length(min=1, error="Field cannot be blank")

class ContactSubmissionSerializer(ModelSerializer):
    email = fields.Email(required=True)
    message = fields.Str(validate=not_blank)

    class Meta:
        model = ContactSubmission

    @pre_load
    def message_to_html(self, data, **kwargs):
        if data.get('message'):
            message = html.escape(data['message'])
            message = re.sub(r'\n\n+', '\n\n', '\n'.join(map(
                str.strip,
                message.splitlines()
            )))
            data['message'] = '\n'.join(map(
                lambda p: f'<p>{p!s}</p>',
                message.splitlines()
            ))
        return data

