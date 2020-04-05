#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE
from backend.extensions.api import api
from backend.utils.mail import send_mail

from .blueprint import contact_submission
from ..models import ContactSubmission

@api.model_resource(contact_submission, ContactSubmission, '/contact-submissions')
class ContactSubmissionResource(ModelResource):
    include_methods = [CREATE]

    def create(self, contact_submission, errors):
        if errors:
            return self.errors(errors)

        send_mail(subject='New Contact Submission',
                  recipients=list(current_app.config.get('MAIL_ADMINS')),
                  template='email/contact_submission.html',
                  contact_submission=contact_submission)

        return self.created(contact_submission)