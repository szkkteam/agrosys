#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.contrib.contact_submission.models import ContactSubmission

CONTACT_DATA = {'name': 'foo',
                'email': 'a@b.com',
                'message': 'hello world'}


@pytest.mark.usefixtures('db_session')
class TestContactSubmissionModels:
    def test_name_required(self):
        data = CONTACT_DATA.copy()
        data['name'] = None
        with pytest.raises(IntegrityError):
            ContactSubmission.create(**data, commit=True)

    def test_email_required(self):
        data = CONTACT_DATA.copy()
        data['email'] = None
        with pytest.raises(IntegrityError):
            ContactSubmission.create(**data, commit=True)

    def test_message_required(self):
        data = CONTACT_DATA.copy()
        data['message'] = None
        with pytest.raises(IntegrityError):
            ContactSubmission.create(**data, commit=True)

