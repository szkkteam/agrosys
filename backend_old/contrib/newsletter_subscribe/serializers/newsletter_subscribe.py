#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelSerializer, fields, validates, ValidationError

from ..models import NewsletterSubscribe

class NewsletterSubscribeSerializer(ModelSerializer):
    email = fields.Email(required=True)
    is_active = fields.Boolean(missing=True, allow_none=True)

    class Meta:
        model = NewsletterSubscribe
        exclude = ('created_at', 'updated_at')
        dump_only = ('is_active')

    @validates('email')
    def validate_email(self, email):
        existing = NewsletterSubscribe.get_by(email=email)
        if existing and (self.is_create() or existing != self.instance):
            raise ValidationError('Sorry, you are already subscribed with that email.')