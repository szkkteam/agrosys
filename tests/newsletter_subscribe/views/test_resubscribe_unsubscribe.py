#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports
from backend.utils import encode_token, decode_token

@pytest.mark.usefixtures('newslettersubscribe')
class TestFollowResubscribeUnsubscribeLink:

    def test_resubscribe(self, newslettersubscribe, client):
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.resubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == True

    def test_unsubscribe(self, newslettersubscribe, client):
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.unsubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == False

    def test_unsubscribe_resubscribe(self, newslettersubscribe, client):
        # First Unsubscribe
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.unsubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == False

        # Second Resubscribe
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.resubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == True

@pytest.mark.usefixtures('newslettersubscribe')
class TestResubscribeUnsubscribeTemplates:

    def test_resubscribe_template(self, newslettersubscribe, client, templates):
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.resubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == True

        assert len(templates) == 1
        assert templates[0].template.name == 'newsletter_subscribe/email/confirm_resubscribe.html'
        print(templates[0].context)

    def test_unsubscribe(self, newslettersubscribe, client, templates):
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.unsubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == False

        assert len(templates) == 1
        assert templates[0].template.name == 'newsletter_subscribe/email/confirm_unsubscribe.html'

    def test_unsubscribe_resubscribe(self, newslettersubscribe, client, templates):
        # First Unsubscribe
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.unsubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == False

        assert len(templates) == 1
        assert templates[0].template.name == 'newsletter_subscribe/email/confirm_unsubscribe.html'
        print(templates[0].template.name)
        print("templates[0].context: ", templates[0].context)
        resubscribe_link = templates[0].context.get('resubscribe_link')

        # Second Resubscribe
        token = encode_token(newslettersubscribe.email)
        r = client.get(url_for('newsletter_subscribe.resubscribe', token=token))
        assert r.status_code == 200
        assert newslettersubscribe.is_active == True

        assert len(templates) == 2
        assert templates[1].template.name == 'newsletter_subscribe/email/confirm_resubscribe.html'
        unsubscribe_link = templates[1].context.get('resubscribe_link')
        assert resubscribe_link != unsubscribe_link
