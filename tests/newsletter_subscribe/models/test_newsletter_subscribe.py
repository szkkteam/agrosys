#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.contrib.newsletter_subscribe.models import NewsletterSubscribe

SUBSCRIBE_DATA = {'email': 'foobar@example.com',
                  'is_active': True}


@pytest.mark.usefixtures('db_session')
class TestNewsletterSubscribeModels:
    def test_email_required(self):
        data = SUBSCRIBE_DATA.copy()
        data['email'] = None
        with pytest.raises(IntegrityError):
            NewsletterSubscribe.create(**data, commit=True)

    def test_email_duplicated(self):
        data = SUBSCRIBE_DATA.copy()
        NewsletterSubscribe.create(**data, commit=True)
        with pytest.raises(IntegrityError):
            NewsletterSubscribe.create(**data, commit=True)

    def test_active_not_required(self):
        data = SUBSCRIBE_DATA.copy()
        data['is_active'] = None
        r = NewsletterSubscribe.create(**data, commit=True)

    def test_active_default_true(self):
        data = SUBSCRIBE_DATA.copy()
        data['is_active'] = None
        r = NewsletterSubscribe.create(**data, commit=True)
        assert r.is_active == True