#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports

NEWSLETTER_SUBSCRIBE_DATA = dict(
    email='foobar@example.com',
    isActive=True,
)


#@pytest.mark.usefixtures('user')
class TestNewsletterSubscribeResource:
    def test_post_new_user_subscribe_explicit_active(self, api_client, outbox, templates):
        data = NEWSLETTER_SUBSCRIBE_DATA.copy()
        r = api_client.post(url_for('api.newsletter_subscribes_resource'), data=data)
        assert r.status_code == 201

        assert r.status_code == 201
        assert len(outbox) == len(templates) == 1
        assert templates[0].template.name == 'newsletter_subscribe/email/welcome_subscribed.html'

    def test_post_new_user_subscribe_implicit_active(self, api_client, outbox, templates):
        data = NEWSLETTER_SUBSCRIBE_DATA.copy()
        data['isActive'] = None
        r = api_client.post(url_for('api.newsletter_subscribes_resource'), data=data)
        assert r.status_code == 201
        assert len(outbox) == len(templates) == 1
        assert templates[0].template.name == 'newsletter_subscribe/email/welcome_subscribed.html'

    def test_patch_modify_user_active(self, api_client, newslettersubscribe, outbox, templates):
        r = api_client.patch(url_for('api.newsletter_subscribe_resource', id=newslettersubscribe.id), data=dict(isActive=False))
        assert r.json['isActive'] == newslettersubscribe.is_active == False
        assert r.status_code == 200
        assert len(outbox) == len(templates) == 0

    def test_user_double_subscribe(self, api_client):
        data = NEWSLETTER_SUBSCRIBE_DATA.copy()
        r = api_client.post(url_for('api.newsletter_subscribes_resource'), data=data)
        assert r.status_code == 201
        r = api_client.post(url_for('api.newsletter_subscribes_resource'), data=data)
        assert r.status_code == 400
